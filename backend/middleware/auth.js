// backend/middleware/auth.js
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'No token, auth denied' });

  const token = header.split(' ')[1]; // “Bearer <token>”
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId).select('-password');
    if (!user) throw Error();
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
