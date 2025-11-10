const mongoose = require('mongoose');
const AuthorSchema = require('./author');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  author: { type: AuthorSchema, required: true }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;