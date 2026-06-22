import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:4s]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
          Privacy by design · Built for conversations
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Anonymous messages.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Real conversations.
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
          Ghost Protocol lets you receive truly anonymous messages from anyone.
          No sender data. No tracking. Just words.
        </p>

        <div className="flex items-center justify-center gap-3">
          {user ? (
            <Link
              to="/feed"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-600/30"
            >
              Go to Feed
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-purple-600/30"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg font-semibold transition backdrop-blur-sm"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
            <div className="text-purple-400 text-2xl mb-3">⌘</div>
            <h3 className="font-semibold mb-2">Truly Anonymous</h3>
            <p className="text-sm text-slate-400">
              Sender data is never stored — not even hashed IPs. Privacy by
              design, not by promise.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
            <div className="text-purple-400 text-2xl mb-3">↑</div>
            <h3 className="font-semibold mb-2">Vote & Discover</h3>
            <p className="text-sm text-slate-400">
              Public posts with upvotes and downvotes. The best conversations
              rise to the top.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
            <div className="text-purple-400 text-2xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">Share Your Link</h3>
            <p className="text-sm text-slate-400">
              Get a unique profile URL. Drop it anywhere — Instagram, Twitter,
              WhatsApp — and receive messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home