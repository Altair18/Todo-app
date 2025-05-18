// src/components/SubTaskForm.jsx
import { useState } from 'react';
import api from '../api';

export default function SubTaskForm({ parentId, onCreate }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/tasks/${parentId}/subtasks`, { title });
      onCreate(data);
      setTitle('');
    } catch (err) {
      console.error('Failed to create subtask', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex space-x-2">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New sub-task"
        className="flex-1 p-1 border rounded"
        required
      />
      <button type="submit" className="px-3 bg-green-500 text-white rounded">
        +
      </button>
    </form>
  );
}
