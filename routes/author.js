const authorController = require('../controller/authorController')
const router = require('express').Router();

//Add author
router.post('/',authorController.addAuthor);
// get all author
router.get('/',authorController.getAllAuthor);
//get an author
router.get('/:id',authorController.getAnAuthor);

module.exports = router;