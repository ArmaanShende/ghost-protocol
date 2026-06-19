const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message