const { body, param } = require('express-validator');
const mongoose = require('mongoose');

exports.validateBookId = [
  param('id').custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid book ID format');
    }
    return true;
  })
];

exports.validateBook = [
  body('title')
    .exists().withMessage('title is required')
    .isString().withMessage('title must be a string')
    .isLength({ min: 1 }).withMessage('title cannot be empty'),
  body('year')
    .exists().withMessage('year is required')
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage('year must be a valid number'),
  body('genre')
    .exists().withMessage('genre is required')
    .isString().withMessage('genre must be a string')
    .isLength({ min: 2 }).withMessage('genre must be at least 2 characters'),
  body('author')
    .exists().withMessage('author is required')
    .isObject().withMessage('author must be an object'),
  body('author.name')
    .exists().withMessage('author.name is required')
    .isString().withMessage('author.name must be a string'),
  body('author.birth_year')
    .exists().withMessage('author.birth_year is required')
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage('author.birth_year must be a valid year'),
  body('author.nationality')
    .exists().withMessage('author.nationality is required')
    .isString().withMessage('author.nationality must be a string')
];
