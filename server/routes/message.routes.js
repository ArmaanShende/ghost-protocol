const express = require('express')
const router = express.Router()
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/message.controller')
const { protect } = require('../middleware/auth.middleware')
const { messageLimiter } = require('../middleware/rateLimiter.middleware')

// @route   POST /api/messages/:username
// @access  Public routes (rate limited — 10 messages per hour per IP)
router.post('/:username', messageLimiter, sendMessage)

// @route   GET /api/messages
// @access  Private routes (recipient's inbox)
router.get('/', protect, getMessages)

// @route   PATCH /api/messages/:id/read
// @access  Private routes (recipient only)
router.patch('/:id/read', protect, markAsRead)

// @route   DELETE /api/messages/:id
// @access  Private routes (recipient only)
router.delete('/:id', protect, deleteMessage)

module.exports = router