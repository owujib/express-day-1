const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// static routes
app.use('/images', express.static(path.join(__dirname, '/views/images/')));
app.use('/css', express.static(path.join(__dirname, '/views/css/')));

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
  res.send(`<h1>404 page not found can not get :${req.url}</h1>`);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
