const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//products
const productRouter = require('./routes/product.routes');

const app = express();

app.use(express.json());

app.use('/api/product', productRouter);

mongoose
  .connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database is connected '))
  .catch((err) => console.log(err));

const port = process.env.PORT;
console.log(port);

app.listen(port, () => {
  console.log('App listening on port !' + port);
});
