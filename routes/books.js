var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

router.get('/', async(req, res, next) => {
  res.redirect('/books/page=1')
})

// View all books/10 per page
router.get('/page=:currentPage', async (req, res, next) => {
    const currentPage = req.params.currentPage
    const limit = 10
    const allBooks = await Book.findAll();
    const books = await Book.findAll({
      limit: 10,
      offset: (limit * currentPage) - limit
    })
    const numberOfPages  =  await Math.ceil(allBooks.length/10);
    const page = 1
    const query = req.body.search
    res.render('index', {books, numberOfPages, page, query} )
  });


  router.post('/search', async (req, res, next) => {
    const query = req.body.search
    const matches = [];
    const allBooks = await Book.findAll();
    for(let i = 0; i < allBooks.length; i++){
      if(
        allBooks[i].title.includes(query) || allBooks[i].author.includes(query)
        ){
        matches.push(allBooks[i])
      }
    }

    
    res.render('index', books = matches, )
  })



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
    book = Book.build(req.body);
    res.render('new-book',{ book, errors: error.errors});
  } else {
    throw error
  }
}
});

// View the form to update a book
router.get('/:id', async (req,res, next) => {
  const book = await Book.findByPk(req.params.id)
  const allBooks = await Book.findAll();
  if(book > allBooks.length -1){
    next();
  } else {
    res.render('update-book', {book})
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
        await Book.build(req.body);
        res.render('update-book',{ book, errors: error.errors});
      } else {
        throw error
      }
    }
  });

  //delete a book
router.post('/:id/delete', async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  try {
    await book.destroy();
    res.redirect("/books");
  } catch {
    throw error()
}})



module.exports = router;

