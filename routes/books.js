var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


router.get('/', async (req, res, next) => {
    res.render('index')
  });


module.exports = router;
