const mongoose = require('mongoose');
const BookSchema = require('./book').schema || require('./book'); // agnostic

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  likes: { type: [BookSchema], default: [] }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
