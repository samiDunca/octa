const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const employeeSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, 'the employee must have a name'],
  // },
  firstName: {
    type: String,
    require: [true, 'employee must have a firstName'],
  },
  lastName: {
    type: String,
    require: [true, 'employee must have a lastName'],
  },
  email: {
    type: String,
    require: [true, 'employee must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  password: {
    type: String,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  address: String,
  phone: String,

  // one to many
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

employeeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'role',
    select: 'name authorities',
  });

  next();
});

employeeSchema.pre('save', async function (next) {
  //daca parola nu e modificata, nu are rost sa incriptam iarasi, poate userul
  //si-a schimbat doar emailul
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

employeeSchema.pre('save', function () {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

employeeSchema.methods.correctPassword = async function (
  candidatePassword,
  employeePassword
) {
  return await bcrypt.compare(candidatePassword, employeePassword);
};

employeeSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

employeeSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
