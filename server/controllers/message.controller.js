const Message = require('../models/Message')
const User = require('../models/User')

// @desc    Send anonymous message to a user
// @route   POST /api/messages/:username
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { content } = req.body
    const { username } = req.params

    // Find recipient by username
    const recipient = await User.findOne({ username })

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' })
    }

    // Create message — no sender info stored
    const message = await Message.create({
      recipient: recipient._id,
      content
    })

    res.status(201).json({
      message: 'Message sent anonymously',
      messageId: message._id
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all messages for logged-in user
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Mark a message as read
// @route   PATCH /api/messages/:id/read
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    message.isRead = true
    await message.save()

    res.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    await message.deleteOne()
    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage }