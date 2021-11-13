var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const models = require('./models');
const index = require('./routes/index');
const books = require('./routes/books');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/books', books)

//Serving static files
app.use('/static', express.static('public'));

(async () => {
  await models.sequelize.sync();
  console.log(models.Book)
  //testing if a connection has been established or not
    try {
     await models.sequelize.authenticate();
     console.log('Connection has been established successfully.');
   } catch (error) {
     console.error('Unable to connect to the database:', error);
   }
})();

// 404 handler
app.use((req, res, next) =>{
  const err = new Error();
  err.status = 404;
  err.message = "Page not found"
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if(err){
    console.log(err.status + " " + err.message)
  }
  //If the error status is 404 - render the page-not-found template. Else - render the 'error' template
  if(err.status === 404){
    res.render('page-not-found');
  } else {
    err.message = err.message || "Something went Wrong"
    err.status = err.status || 500
    res.render('error', {err});
  }
});



module.exports = app;
