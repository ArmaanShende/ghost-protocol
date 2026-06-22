import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition">
          <span className="text-purple-500">/</span> Ghost Protocol
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/feed" className="hover:text-purple-400 transition">
                Feed
              </Link>
              <Link to="/inbox" className="hover:text-purple-400 transition">
                Inbox
              </Link>
              <Link
                to={`/u/${user.username}`}
                className="hover:text-purple-400 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-400 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar