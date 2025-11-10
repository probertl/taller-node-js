const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const validateRequest = require('../middlewares/validateRequest');
const { validateProduct, validateProductId } = require('../validators/productValidators');

// GET /products -> devuelve todos los productos
router.get('/', productsController.getAllProducts);

// POST /products -> crea un producto
router.post('/', validateProduct, validateRequest, productsController.createProduct);

// GET /products/:id -> obtiene un producto por id
router.get('/:id', validateProductId, validateRequest, productsController.getProductById);

// PUT /products/:id -> actualiza un producto
router.put('/:id', validateProductId, validateProduct, validateRequest, productsController.updateProduct);

// DELETE /products/:id -> elimina un producto
router.delete('/:id', validateProductId, validateRequest, productsController.deleteProduct);

module.exports = router;
