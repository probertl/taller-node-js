const { body, param } = require('express-validator');
const mongoose = require('mongoose');

exports.validateUserId = [
  param('id').custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid user ID format');
    }
    return true;
  })
];

exports.validateUser = [
  body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({ min: 2 }).withMessage('name must be at least 2 characters'),
  body('email')
    .exists().withMessage('email is required')
    .isEmail().withMessage('email must be valid'),
  body('likes').optional().isArray().withMessage('likes must be an array'),
  body('likes.*.title')
    .optional().isString().withMessage('likes.title must be a string'),
  body('likes.*.year')
    .optional().isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage('likes.year must be a valid number'),
  body('likes.*.genre')
    .optional().isString().withMessage('likes.genre must be a string'),
  body('likes.*.author')
    .optional().isObject().withMessage('likes.author must be an object'),
  body('likes.*.author.name')
    .optional().isString().withMessage('likes.author.name must be a string'),
  body('likes.*.author.birth_year')
    .optional().isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage('likes.author.birth_year must be valid'),
  body('likes.*.author.nationality')
    .optional().isString().withMessage('likes.author.nationality must be a string')
];
