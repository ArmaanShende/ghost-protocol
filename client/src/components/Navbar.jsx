import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const navLinkClass = (path) =>
    `px-3 py-1.5 rounded-md text-sm transition ${
      isActive(path)
        ? 'bg-white/10 text-white'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-xl bg-slate-950/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-white hover:opacity-90 transition"
        >
          <span className="text-purple-500">/</span> Ghost Protocol
        </Link>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              <Link to="/feed" className={navLinkClass('/feed')}>
                Feed
              </Link>
              <Link to="/inbox" className={navLinkClass('/inbox')}>
                Inbox
              </Link>
              <Link
                to={`/u/${user.username}`}
                className={navLinkClass(`/u/${user.username}`)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1.5 rounded-md text-sm text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass('/login')}>
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 px-3 py-1.5 rounded-md text-sm bg-white/10 hover:bg-white/15 text-white border border-white/10 transition"
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