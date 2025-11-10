const Book = require('../models/book');
const isValidObjectId = require('../utils/validateObjectId');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().lean();
    res.json(books);
  } catch (err) { next(err); }
};

exports.createBook = async (req, res, next) => {
  try {
    const { title, year, genre, author } = req.body;
    if (!title || !year || !genre || !author) {
      return res.status(400).json({ error: 'Falten camps requerits' });
    }
    const book = new Book({ title, year, genre, author });
    await book.save();
    res.status(201).json(book);
  } catch (err) { next(err); }
};  

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const book = await Book.findById(id).lean();
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) { next(err); }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const { title, year, genre, author } = req.body;
    const updated = await Book.findByIdAndUpdate(id, { title, year, genre, author }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
