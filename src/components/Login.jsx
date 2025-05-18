// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login({ onSuccess, onCancel, onSwitch }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(email.trim().toLowerCase(), password);
      if (onSuccess) onSuccess();
      else nav('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-black text-center mb-2">Log In</h2>
          {error && (
            <div className="text-red-600 text-sm text-center py-1">{error}</div>
          )}
          <input
            type="email"
            name="email"
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full p-2 rounded border bg-blue-50 dark:bg-gray-900"
          />
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full p-2 rounded border bg-blue-50 dark:bg-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>
          <div className="flex justify-between items-center mt-2">
            {onCancel && (
              <button
                type="button"
                className="text-gray-500 text-sm px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <span className="text-sm">
              Don't have an account?{' '}
              {onSwitch ? (
                <button
                  type="button"
                  className="text-green-600 underline"
                  onClick={onSwitch}
                >
                  Register
                </button>
              ) : (
                <Link to="/register" className="text-green-600 underline">
                  Register
                </Link>
              )}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
