const express = require('express');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const assessmentRouter = require('./routes/assessmentRoutes');
const roleRouter = require('./routes/roleRoutes');
const employeeRouter = require('./routes/employeeRoutes');
const offerRouter = require('./routes/offerRoutes');

const app = express();
app.use(cors());
// GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimiter({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize());

// Data sanitization against XSS (e.g. inserting HTML into code)
app.use(xss());

app.use('/api/v1/assessment', assessmentRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/offer', offerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
