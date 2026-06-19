const express = require('express')
const router = express.Router()
const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/message.controller')
const { protect } = require('../middleware/auth.middleware')

// Public route — anyone can send anonymously
router.post('/:username', sendMessage)

// Protected routes — only recipient can access
router.get('/', protect, getMessages)
router.patch('/:id/read', protect, markAsRead)
router.delete('/:id', protect, deleteMessage)

module.exports = router