const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');
// static routes
app.use('/images', express.static(path.join(__dirname, '/views/images/')));
app.use('/css', express.static(path.join(__dirname, '/views/css/')));

const data = fs.readFileSync(`${__dirname}/MOCK_DATA.json`, 'utf-8');
const products = JSON.parse(data);

//routes
app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Home page',
    header: 'Welcome to express js 🍪🍪',
  });
});

app.get('/about', (req, res) => {
  res.render('about.ejs', {
    title: 'About us',
    header: 'About Ejs ',
  });
});

app.get('/products', (req, res) => {
  res.render('products/products.ejs', {
    title: 'Prorducts 📦📦',
    header: 'All Prorducts 📦📦 ',
    products,
  });
});
app.get('/product', (req, res) => {
  let id = req.query.id;
  products.findIndex((product) => {
    if (product.id == req.query.id) {
      return res.render('products/product-single.ejs', {
        title: 'Prorducts 📦📦',
        header: 'All Prorducts 📦📦 ',
        id,
        product,
      });
    }
  });
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs', {
    title: 'Contact us',
    header: 'Contact ',
  });
});
app.post('/contact', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('*', (req, res) => {
  res.send(`<h1>404 page not found can not get </h1>`);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
