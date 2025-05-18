import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'


export default function ProductivityChart({ tasks }) {
  // Group completed tasks by date
  const dailyCounts = tasks
    .filter(t => t.done && t.updatedAt)
    .reduce((acc, task) => {
      const date = new Date(task.updatedAt).toISOString().slice(0, 10)
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

  const today = new Date()
  const days = [...Array(7)].map((_, i) => {
    const date = format(subDays(today, 6 - i), 'yyyy-MM-dd')
    return { date, count: 0 }
  })

  const completedByDay = tasks
    .filter(t => t.done && t.updatedAt)
    .reduce((acc, task) => {
      const d = new Date(task.updatedAt).toISOString().slice(0, 10)
      acc[d] = (acc[d] || 0) + 1
      return acc
    }, {})

  const data = days.map(day => ({
    date: day.date,
    count: completedByDay[day.date] || 0
  }))


  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Productivity Tracker</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No completed tasks yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
