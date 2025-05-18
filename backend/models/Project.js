const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  due: { type: String },
  tasks: [
    {
      title: String,
      done: { type: Boolean, default: false }
    }
  ]
})

module.exports = mongoose.model('Project', projectSchema)
