// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true },
  description: String,
  done:        { type: Boolean, default: false },
  dueDate:     Date,
  labels:      [String],
  priority: {
    type: String,
    enum: ['low','medium','high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
