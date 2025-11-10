const Product = require('../models/product');
const isValidObjectId = require('../utils/validateObjectId');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, quantity, unit, category, purchased } = req.body;
    if (!name || quantity === undefined || !unit || !category || purchased === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = new Product({ name, quantity, unit, category, purchased });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const product = await Product.findById(id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const { name, quantity, unit, category, purchased } = req.body;
    const updated = await Product.findByIdAndUpdate(
      id,
      { name, quantity, unit, category, purchased },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
