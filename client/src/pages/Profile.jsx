import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Profile() {
  const { username } = useParams()
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const isOwnProfile = user && user.username === username
  const profileUrl = `${window.location.origin}/u/${username}`

  const handleSend = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setSending(true)
    setError('')
    setSuccess(false)

    try {
      await api.post(`/messages/${username}`, { content })
      setSuccess(true)
      setContent('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 py-12">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-purple-600 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
          {username.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold mb-2">@{username}</h1>
        <p className="text-slate-400">
          {isOwnProfile
            ? 'Share your link to receive anonymous messages'
            : 'Send an anonymous message'}
        </p>
      </div>

      {isOwnProfile ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <label className="block mb-2 text-sm text-slate-400">Your profile link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Share this link on Instagram, Twitter, or anywhere. People can send you
            anonymous messages without an account.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSend}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4"
        >
          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-2 rounded mb-4">
              Message sent anonymously
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Send something anonymous to @${username}...`}
            maxLength={500}
            rows={5}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition resize-none"
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-slate-500">{content.length}/500</span>
            <button
              type="submit"
              disabled={sending || !content.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              {sending ? 'Sending...' : 'Send Anonymously'}
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-4 text-center">
            Your identity is never stored. Truly anonymous.
          </p>
        </form>
      )}
    </div>
  )
}

export default Profile