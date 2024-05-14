import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">Home</Link>
          </div>
          <div className="flex items-center">
            <Link to="/posts" className="text-white font-bold px-4 py-2 rounded hover:bg-gray-700">Posts</Link>
          </div>
          <div className='flex justify-end p-4'>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
