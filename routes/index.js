var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

// redirect to /books
router.get('/', async (req, res, next) => {
  res.redirect('/books')

});

module.exports = router;

