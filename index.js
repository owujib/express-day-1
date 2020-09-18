const express = require('express');
const { Error } = require('mongoose');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
require('dotenv').config();

//products
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can not find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can not find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can not find ${req.originalUrl} on this server`));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

mongoose
  .connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('database is connected '))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log('App listening on port !' + port);
});
