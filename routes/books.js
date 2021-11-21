var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

// View all books
router.get('/', async (req, res, next) => {
    const allBooks = await Book.findAll()
    res.render('index', {allBooks})
  });

// View the form to add a new book
router.get('/new', async (req,res, next) => {
    res.render('new-book')
});

// Post new book
router.post('/new', async (req, res, next) =>{
  let book;
try {
    book = await Book.create(req.body)
    res.redirect('/')

//If error - check if its a SequelizeValidationError or not
} catch(error){
  if(error.name === "SequelizeValidationError"){
    const errors = error.errors.map(err => err.message)
    console.error("Validation errors: ", errors)
  } else {
    throw error
  }
}
});

// View the form to update a book
router.get('/:id', async (req,res, next) => {
  const bookById = await Book.findByPk(req.params.id)
  const allBooks = await Book.findAll();
  if(bookById > allBooks.length -1){
    next();
  } else {
    res.render('update-book', {bookById})
  }
});

//Update a book
router.post('/:id', async (req, res, next) =>{
  let book;
  book = await Book.findByPk(req.params.id)
try {
    await book.update(req.body)
    res.redirect('/')
  } catch(error){
      if(error.name === "SequelizeValidationError"){
        const errors = error.errors.map(err => err.message)
        console.error("Validation errors: ", errors)
      } else {
        throw error
      }
    }
  });

router.post(':id/delete', (req, res, next) => {
  //deletes a book.
  //CANT BE UNDONE. Create a test book to test deleting
})


module.exports = router;