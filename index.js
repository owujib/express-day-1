const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

let db =
  'mongodb+srv://admin:password@cluster0.c3mvo.mongodb.net/e-com?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then(() => console.log('database is connected '))
  .catch((err) => console.log(err));

const port = process.env.PORT;
console.log(port);

app.listen(port, () => {
  console.log('App listening on port !' + port);
});
