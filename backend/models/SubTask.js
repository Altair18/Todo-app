// backend/models/SubTask.js
const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  title:      { type: String, required: true },
  done:       { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('SubTask', subTaskSchema);
