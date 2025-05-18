export default function Sidebar() {
    return (
      <nav className="h-full flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Menu</h3>
          <input
            type="search"
            placeholder="Search…"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2 dark:text-gray-300">Tasks</h4>
          <ul className="space-y-1">
            {['Upcoming','Today','Calendar','Sticky Wall'].map(label => (
              <li key={label}>
                <button className="flex justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="capitalize">{label}</span>
                  <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-2">5</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 dark:text-gray-300">Lists</h4>
          <ul className="space-y-1">
            {['Personal','Work','List 1'].map(label => (
              <li key={label}>
                <button className="flex justify-between w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  {label}
                  <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-2">3</span>
                </button>
              </li>
            ))}
            <li>
              <button className="flex items-center space-x-1 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                <span className="text-xl leading-none">＋</span>
                <span>Add New List</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
  