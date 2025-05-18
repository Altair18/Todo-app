const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

// GET all projects
router.get('/', async (req, res) => {
  const projects = await Project.find()
  res.json(projects)
})

// GET project by ID
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.json(project)
})

// PUT project (for updating tasks)
router.put('/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})
module.exports = router
