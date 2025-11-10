const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateRequest = require('../middlewares/validateRequest');
const { validateUser, validateUserId } = require('../validators/userValidators');

router.post('/', validateUser, validateRequest, usersController.createUser);

router.get('/', usersController.getAllUsers);

router.get('/:id', validateUserId, validateRequest, usersController.getUserById);

router.put('/:id', validateUserId, validateUser, validateRequest, usersController.updateUser);

module.exports = router;
