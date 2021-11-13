var express = require('express');
var router = express.Router();

// redirect to /books
router.get('/', async (req, res, next) => {
  res.redirect('/books')

});

module.exports = router;