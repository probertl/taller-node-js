const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birth_year: { type: Number, required: true },
  nationality: { type: String, required: true }
}, { _id: false }); // evitar id propi si s'embolca en subdocuments

module.exports = AuthorSchema;