export default function TaskDetail({ task }) {
    if (!task) {
      return (
        <div className="p-4 rounded bg-white dark:bg-gray-800 text-gray-500">
          Select a task to see details
        </div>
      )
    }
  
    return (
      <div className="p-6 rounded bg-white dark:bg-gray-800 space-y-4">
        <h2 className="text-2xl font-bold">{task.title}</h2>
        {task.description && (
          <p className="text-gray-700 dark:text-gray-300">
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p>
            <strong>Due:</strong>{' '}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
        {task.labels?.length > 0 && (
          <div className="flex space-x-2">
            {task.labels.map(label => (
              <span
                key={label}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }
  