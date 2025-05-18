// src/components/TaskForm.jsx
import { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [labelsStr, setLabelsStr] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = e => {
    e.preventDefault();

    const labels = labelsStr
      .split(',')
      .map(l => l.trim())
      .filter(Boolean);

    if (!title) {
      alert("Task title is required!");
      return;
    }

    // No API call here! Just construct task and call onCreate
    const task = {
      title,
      description,
      dueDate: dueDate || undefined,
      labels,
      priority
    };

    onCreate(task);

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setLabelsStr('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded space-y-4 dark:text-white">
      <h2 className="text-lg font-medium">New Task</h2>

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded dark:text-black"
        required
      />

      {/* Description */}
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded dark:text-black"
      />

      {/* Due Date */}
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="w-full p-2 border rounded dark:text-black"
      />

      {/* Labels */}
      <input
        type="text"
        value={labelsStr}
        onChange={e => setLabelsStr(e.target.value)}
        placeholder="Labels (comma-separated)"
        className="w-full p-2 border rounded dark:text-black"
      />

      {/* Priority */}
      <div>
        <label className="block mb-1 text-sm font-medium">Priority</label>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="w-full p-2 border rounded dark:text-black"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Task
      </button>
    </form>
  );
}
