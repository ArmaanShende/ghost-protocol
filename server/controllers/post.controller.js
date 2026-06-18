const Post = require('../models/Post')

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content } = req.body

    const post = await Post.create({
      author: req.user._id,
      content
    })

    const populatedPost = await Post.findById(post._id).populate(
      'author',
      'username'
    )

    res.status(201).json(populatedPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all posts (public feed)
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update a post
// @route   PATCH /api/posts/:id
// @access  Private (author only)
const updatePost = async (req, res) => {
  try {
    const { content } = req.body
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this post' })
    }

    post.content = content
    post.isEdited = true
    post.editedAt = new Date()
    await post.save()

    const updatedPost = await Post.findById(post._id).populate('author', 'username')
    res.json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (author only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' })
    }

    await post.deleteOne()
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Vote on a post (upvote or downvote)
// @route   POST /api/posts/:id/vote
// @access  Private
const votePost = async (req, res) => {
  try {
    const { voteType } = req.body // "upvote" or "downvote"
    const userId = req.user._id
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const alreadyUpvoted = post.upvotes.includes(userId)
    const alreadyDownvoted = post.downvotes.includes(userId)

    if (voteType === 'upvote') {
      if (alreadyUpvoted) {
        post.upvotes.pull(userId)
      } else {
        post.upvotes.push(userId)
        if (alreadyDownvoted) post.downvotes.pull(userId)
      }
    } else if (voteType === 'downvote') {
      if (alreadyDownvoted) {
        post.downvotes.pull(userId)
      } else {
        post.downvotes.push(userId)
        if (alreadyUpvoted) post.upvotes.pull(userId)
      }
    }

    await post.save()
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createPost, getPosts, updatePost, deletePost, votePost }