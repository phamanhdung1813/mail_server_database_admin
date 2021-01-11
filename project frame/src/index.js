const express = require('express');
const path = require ('path');
const app = express();
const port = 3000;
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const sass = require('node-sass');

//Static file in public folder
app.use(express.static(path.join(__dirname, 'public')));

//HTTP morgan
app.use(morgan('combined'));

//Template Handlebars
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//SASS


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})