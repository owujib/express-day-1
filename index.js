const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

//products
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);

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
