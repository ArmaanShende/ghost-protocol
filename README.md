# Ghost Protocol

An anonymous social platform where users can send anonymous messages and engage with public posts.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT

## Features

- [ ] Anonymous message delivery
- [ ] Public post feed
- [ ] Upvote / downvote posts
- [ ] User authentication
- [ ] Public profile pages

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ghost-protocol.git

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables
Create a `.env` file in `/server` based on `.env.example`

## Live Demo
_Coming soon_


## Roadmap

### v1 (Current)
- [x] User authentication with JWT
- [ ] Public post feed
- [ ] Upvote / downvote posts
- [ ] Anonymous messaging
- [ ] Deployment

### v2 (Planned)
- [ ] Nested comments with cascading delete
- [ ] Cursor-based pagination for posts feed
- [ ] Image upload support via Cloudinary