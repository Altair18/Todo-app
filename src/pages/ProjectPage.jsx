import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api'

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => alert('Failed to load project'))
  }, [id])

  const addTask = async () => {
    if (!newTask.trim()) return
    const updated = { ...project, tasks: [...project.tasks, { title: newTask, done: false }] }
    await api.put(`/projects/${id}`, updated)
    setProject(updated)
    setNewTask('')
  }

  if (!project) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-sm text-gray-500 mb-6">Due: {project.due}</p>

      <div className="mb-6">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {project.tasks.map((task, idx) => (
          <li key={idx} className="p-4 border rounded bg-white dark:bg-gray-800 flex justify-between items-center">
            <span>{task.title}</span>
            <input type="checkbox" checked={task.done} readOnly />
          </li>
        ))}
      </ul>
    </div>
  )
}
