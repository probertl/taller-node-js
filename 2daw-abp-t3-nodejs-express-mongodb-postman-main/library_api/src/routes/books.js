const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const validateRequest = require('../middlewares/validateRequest');
const { validateBook, validateBookId } = require('../validators/bookValidators');

router.get('/', booksController.getAllBooks);

router.post('/', validateBook, validateRequest, booksController.createBook);

router.get('/:id', validateBookId, validateRequest, booksController.getBookById);

router.put('/:id', validateBookId, validateBook, validateRequest, booksController.updateBook);

router.delete('/:id', validateBookId, validateRequest, booksController.deleteBook);

module.exports = router;
