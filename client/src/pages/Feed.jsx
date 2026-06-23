import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import PostCard from '../components/PostCard'

function Feed() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts')
      setPosts(res.data)
    } catch (err) {
      console.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!content.trim()) return

    setPosting(true)
    try {
      const res = await api.post('/posts', { content })
      setPosts([res.data, ...posts])
      setContent('')
    } catch (err) {
      console.error('Failed to create post')
    } finally {
      setPosting(false)
    }
  }

  const handleVote = (updatedPost) => {
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)))
  }

  const handleDelete = (deletedId) => {
    setPosts(posts.filter((p) => p._id !== deletedId))
  }

  const handleUpdate = (updatedPost) => {
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)))
  }

  return (
    <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 py-12">
      {user && (
        <form
          onSubmit={handleCreatePost}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={500}
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">{content.length}/500</span>
            <button
              type="submit"
              disabled={posting || !content.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              {posting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-center text-slate-400">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-slate-400">No posts yet. Be the first to post!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onVote={handleVote}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Feed