const User = require('../models/user');
const isValidObjectId = require('../utils/validateObjectId');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, likes } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name i email requerits' });
    // likes optional; si ve present, validar una mica la forma
    if (likes && !Array.isArray(likes)) return res.status(400).json({ error: 'likes ha de ser array' });
    const user = new User({ name, email, likes: likes || [] });
    await user.save();
    res.status(201).json(user);
  } catch (err) { next(err); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // retornem només camps públics: name, email, likes
    const users = await User.find().select('name email likes').lean();
    res.json(users);
  } catch (err) { next(err); }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const user = await User.findById(id).select('name email likes').lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const { name, email, likes } = req.body;
    const updated = await User.findByIdAndUpdate(id, { name, email, likes }, { new: true, runValidators: true }).select('name email likes');
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) { next(err); }
};
