const { body, param } = require('express-validator');

exports.validateProductId = [
  param('id').isMongoId().withMessage('Invalid product ID')
];

exports.validateProduct = [
  body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({ min: 1 }).withMessage('name cannot be empty'),

  body('quantity')
    .exists().withMessage('quantity is required')
    .isInt({ min: 0 }).withMessage('quantity must be a non-negative integer'),

  body('unit')
    .exists().withMessage('unit is required')
    .isString().withMessage('unit must be a string')
    .isLength({ min: 1 }).withMessage('unit cannot be empty'),

  body('category')
    .exists().withMessage('category is required')
    .isString().withMessage('category must be a string')
    .isLength({ min: 2 }).withMessage('category must be at least 2 characters'),

  body('purchased')
    .exists().withMessage('purchased is required')
    .isBoolean().withMessage('purchased must be a boolean')
];
