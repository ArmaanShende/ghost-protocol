import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function PostCard({ post, onVote, onDelete, onUpdate }) {
  const { user } = useAuth()
  const [voting, setVoting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [saving, setSaving] = useState(false)

  const isAuthor = user && user._id === post.author?._id
  const hasUpvoted = user && post.upvotes.includes(user._id)
  const hasDownvoted = user && post.downvotes.includes(user._id)
  const score = post.upvotes.length - post.downvotes.length

  const handleVote = async (voteType) => {
    if (!user || voting) return
    setVoting(true)
    try {
      const res = await api.post(`/posts/${post._id}/vote`, { voteType })
      onVote(res.data)
    } catch (err) {
      console.error('Vote failed')
    } finally {
      setVoting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/posts/${post._id}`)
      onDelete(post._id)
    } catch (err) {
      console.error('Delete failed')
    }
  }

  const handleSaveEdit = async () => {
    if (!editContent.trim() || editContent === post.content) {
      setIsEditing(false)
      return
    }
    setSaving(true)
    try {
      const res = await api.patch(`/posts/${post._id}`, { content: editContent })
      onUpdate(res.data)
      setIsEditing(false)
    } catch (err) {
      console.error('Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditContent(post.content)
    setIsEditing(false)
  }

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
    return `${Math.floor(seconds / 86400)}d`
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => handleVote('upvote')}
          disabled={!user || voting}
          className={`p-1 rounded hover:bg-slate-800 transition ${
            hasUpvoted ? 'text-purple-500' : 'text-slate-500'
          }`}
        >
          ▲
        </button>
        <span className="text-sm font-semibold">{score}</span>
        <button
          onClick={() => handleVote('downvote')}
          disabled={!user || voting}
          className={`p-1 rounded hover:bg-slate-800 transition ${
            hasDownvoted ? 'text-red-500' : 'text-slate-500'
          }`}
        >
          ▼
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <span className="font-semibold text-slate-200">
            {post.author?.username || 'Unknown'}
          </span>
          <span>·</span>
          <span>{timeAgo(post.createdAt)}</span>
          {post.isEdited && (
            <>
              <span>·</span>
              <span className="italic">edited</span>
            </>
          )}
        </div>

        {isEditing ? (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-slate-500">{editContent.length}/500</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-400 hover:text-white transition px-3 py-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-100 whitespace-pre-wrap break-words">
            {post.content}
          </p>
        )}

        {isAuthor && !isEditing && (
          <div className="mt-3 flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-xs text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard