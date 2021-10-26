var express = require('express');
var router = express.Router();
const models = require('../models')
const {Book} = models

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // Store all Books in a variable
  const allBooks = await Book.findAll();
  console.log(allBooks)
  //Display all books
  return res.json({allBooks})
});

module.exports = router;
