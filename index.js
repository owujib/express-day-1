const mongoose = require('mongoose');
const app = require('./app');

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
