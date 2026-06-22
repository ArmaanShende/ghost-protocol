const express = require('express')
const router = express.Router()
const { register, login, getMe } = require('../controllers/auth.controller')
const { protect } = require('../middleware/auth.middleware')
const { authLimiter } = require('../middleware/rateLimiter.middleware')

// @route   POST /api/auth/register
// @access  Public (rate limited — 10 attempts per 15 min per IP)
router.post('/register', authLimiter, register)

// @route   POST /api/auth/login
// @access  Public (rate limited — 10 attempts per 15 min per IP)
router.post('/login', authLimiter, login)

// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, getMe)

module.exports = router