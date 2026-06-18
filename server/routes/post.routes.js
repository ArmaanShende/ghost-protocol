const express = require('express')
const router = express.Router()
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  votePost
} = require('../controllers/post.controller')
const { protect } = require('../middleware/auth.middleware')

// Public route
router.get('/', getPosts)

// Protected routes
router.post('/', protect, createPost)
router.patch('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.post('/:id/vote', protect, votePost)

module.exports = router