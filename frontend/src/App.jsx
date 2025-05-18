// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

import Dashboard from './pages/Dashboard'
import Login from './components/Login';      // Make sure it's the right path
import Register from './components/Register';
import ProjectPage from './pages/ProjectPage'

export default function App() {
  const { user, loading } = useContext(AuthContext)
  const { dark, setDark } = useContext(ThemeContext)
  
  if (loading) return <div className="p-4">Loading…</div>

  return (
    <main className={`
      min-h-screen bg-white text-gray-900 
      dark:bg-gray-900 dark:text-gray-100
      transition-colors
    `}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? '/dashboard' : '/login'} />}
        />

        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </main>
  );
}
