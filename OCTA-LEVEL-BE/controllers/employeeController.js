const Employee = require('./../models/employeeModel');
const factory = require('./handlerFactory');
const crypto = require('crypto');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('./../utils/email');

exports.addEmployee = catchAsync(async (req, res, next) => {
  // 1) Generate the random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  let newEmployee = await Employee.create({
    ...req.body,
    passwordResetExpires,
    passwordResetToken,
  });

  // 3) Send it to the employee's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/employee/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email! \n`;

  newEmployee = await newEmployee.populate('role').execPopulate();
  try {
    await sendEmail({
      email: newEmployee.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      message: 'Token sent to email!',
      data: {
        data: newEmployee,
      },
    });
  } catch (err) {
    newEmployee.passwordResetToken = undefined;
    newEmployee.passwordResetExpires = undefined;
    await newEmployee.save();

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.getAllEmployees = factory.getAll(Employee);
exports.getEmployee = factory.getOne(Employee);
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);

// 2) Generate the random reset token
// 3) Send it to the employee's email
