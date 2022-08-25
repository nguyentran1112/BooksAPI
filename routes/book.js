const bookController = require('../controller/bookController');
const router = require('express').Router();

//Add book
router.post('/',bookController.addBook);

//Get all books
router.get('/',bookController.getAllBook);
//get an book
router.get('/:id', bookController.getABook)
//update a book
router.put('/:id', bookController.updateBook);

//Delete book
router.delete('/:id', bookController.deleteBook);
module.exports = router;