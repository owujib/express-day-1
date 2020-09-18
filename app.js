const express = require('express');
const path = require('path');
require('dotenv').config();

//products
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

//error handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can not get ${req.originalUrl} on this server`, 404));
});

//global error handler(middelware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
