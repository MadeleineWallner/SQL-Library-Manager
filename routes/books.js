var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


router.get('/', async (req, res, next) => {
    let allBooks = await Book.findAll()
    res.render('index', allBooks)
  });


module.exports = router;
