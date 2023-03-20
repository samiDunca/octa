const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Employee = require('./../models/employeeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const { create } = require('domain');
const { isGeneratorFunction } = require('util/types');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (employee, statusCode, res) => {
  const token = signToken(employee._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  employee.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      employee,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newEmployee = await Employee.create(req.body);
  createSendToken(newEmployee, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if email and password are correct
  const employee = await Employee.findOne({ email }).select('+password');

  if (
    !employee ||
    !(await employee.correctPassword(password, employee.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) if evrting ok, send response
  createSendToken(employee, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentEmployee = await Employee.findById(decoded.id);
  if (!currentEmployee) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentEmployee.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  req.employee = currentEmployee;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role.name)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) check if email is good
  const employee = await Employee.findOne({ email: req.body.email });
  if (!employee) {
    return next(
      new AppError('There is no employee with this email address.', 404)
    );
  }

  // 2) Generate the random reset token
  const resetToken = employee.createPasswordResetToken();
  await employee.save();
  // 3) Send it to the employee's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/employee/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email! \n`;

  try {
    await sendEmail({
      email: employee.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    employee.passwordResetToken = undefined;
    employee.passwordResetExpires = undefined;
    await employee.save();

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get employee by resetToken
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const employee = await Employee.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) Check if token is invalid or has expired and changed password
  if (!employee) {
    return await next(new AppError('Token is invalid or has expired', 400));
  }

  employee.password = req.body.password;
  employee.passwordConfirm = req.body.passwordConfirm;
  employee.passwordResetToken = undefined;
  employee.passwordResetExpires = undefined;
  await employee.save();

  // 3) Update changedPasswordAt property for the employee
  // in the employeeModel

  // 4) Log the employee in, send JWT
  createSendToken(employee, 200, res);
});
