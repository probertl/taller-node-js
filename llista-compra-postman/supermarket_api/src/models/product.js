const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  category: { type: String, required: true },
  purchased: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
