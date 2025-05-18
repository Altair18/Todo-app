// backend/routes/tasks.js
const express = require('express');
const Task    = require('../models/Task');
const SubTask = require('../models/SubTask');
const auth    = require('../middleware/auth');

const router = express.Router();

// GET all tasks (with optional filters & sorting)
// backend/routes/tasks.js
router.get('/', auth, async (req, res) => {
  try {
    // Build the base filter
    const filter = { user: req.user._id };
    if (req.query.status) {
      filter.done = req.query.status === 'done';           // ?status=done or ?status=pending
    }
    if (req.query.label) {
      filter.labels = req.query.label;                     // ?label=Work
    }

    // Start the query
    let query = Task.find(filter);

    // Apply sort if requested
    if (req.query.sort === 'dueDate_asc') {
      query = query.sort({ dueDate:  1 });
    } else if (req.query.sort === 'dueDate_desc') {
      query = query.sort({ dueDate: -1 });
    }

    const tasks = await query.exec();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST create a task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, labels, priority } = req.body;
    const task = new Task({ user: req.user._id, title, description, dueDate, labels, priority });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET one task + its subtasks
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const subTasks = await SubTask.find({ parentTask: task._id });
    res.json({ ...task.toObject(), subTasks });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a task + its subtasks
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await SubTask.deleteMany({ parentTask: task._id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a subtask
router.post('/:taskId/subtasks', auth, async (req, res) => {
  try {
    const { title, done } = req.body;
    const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const subTask = new SubTask({ parentTask: task._id, title, done });
    await subTask.save();
    res.status(201).json(subTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a subtask
router.put('/subtasks/:id', auth, async (req, res) => {
  try {
    const subTask = await SubTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subTask) return res.status(404).json({ message: 'Subtask not found' });
    res.json(subTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a subtask
router.delete('/subtasks/:id', auth, async (req, res) => {
  try {
    const subTask = await SubTask.findByIdAndDelete(req.params.id);
    if (!subTask) return res.status(404).json({ message: 'Subtask not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
