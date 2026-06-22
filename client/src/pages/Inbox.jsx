import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Inbox() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
      return
    }
    if (user) {
      fetchMessages()
    }
  }, [user, authLoading])

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages')
      setMessages(res.data)
    } catch (err) {
      console.error('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id) => {
    try {
      const res = await api.patch(`/messages/${id}/read`)
      setMessages(messages.map((m) => (m._id === id ? res.data : m)))
    } catch (err) {
      console.error('Failed to mark as read')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await api.delete(`/messages/${id}`)
      setMessages(messages.filter((m) => m._id !== id))
    } catch (err) {
      console.error('Failed to delete')
    }
  }

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  if (authLoading || loading) {
    return (
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 py-12 text-center text-slate-400">
        Loading...
      </div>
    )
  }

  const unreadCount = messages.filter((m) => !m.isRead).length

  return (
    <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <p className="text-slate-400 text-sm mt-1">
          {messages.length} {messages.length === 1 ? 'message' : 'messages'}
          {unreadCount > 0 && ` · ${unreadCount} unread`}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
          <p className="text-slate-400">No messages yet</p>
          <p className="text-xs text-slate-500 mt-2">
            Share your profile link to receive anonymous messages
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`bg-slate-900 border rounded-xl p-4 transition ${
                message.isRead
                  ? 'border-slate-800'
                  : 'border-purple-500/50 bg-slate-900/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Anonymous</span>
                  {!message.isRead && (
                    <span className="bg-purple-500 text-xs px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {timeAgo(message.createdAt)}
                </span>
              </div>

              <p className="text-slate-100 whitespace-pre-wrap break-words mb-3">
                {message.content}
              </p>

              <div className="flex justify-end gap-3">
                {!message.isRead && (
                  <button
                    onClick={() => handleMarkRead(message._id)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message._id)}
                  className="text-xs text-red-400 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Inbox