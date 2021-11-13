var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


router.get('/', async (req, res, next) => {
    const allBooks = await Book.findAll()
    res.render('index', {allBooks})
  });

router.get('/new', async (req,res, next) => {
    res.render('new-book')
});

router.post('/new', (req, res, next) =>{
  //Post a new book to the database
});

router.get('/:id', (req, res, next) => {
  //Show book detail form
});

router.post(':id/delete', (req, res, next) => {
  //deletes a book.
  //CANT BE UNDONE. Create a test book to test deleting
})


module.exports = router;
