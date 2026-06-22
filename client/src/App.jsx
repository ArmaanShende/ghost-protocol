import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Inbox from './pages/Inbox'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/u/:username" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App