const rateLimit = require('express-rate-limit')

// Limit anonymous message sending — strict
const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 messages per hour per IP
  message: { message: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
})

// Limit auth attempts — prevents brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 login/register attempts per 15 min
  message: { message: 'Too many auth attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
})

module.exports = { messageLimiter, authLimiter }