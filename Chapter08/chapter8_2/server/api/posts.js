const db = require('../db')
const APIError = require('./APIError')

const { expressJwt } = require('../token')

module.exports = function postsAPI (app) {
  app.get('/api/posts', (req, res) =>
    res.send(db.getPosts())
  )

  app.get('/api/posts/:id', (req, res) =>
    res.send(db.getPost(req.params.id))
  )

  app.post('/api/posts', expressJwt, (req, res) => {
    // get username from token
    const { sub } = req.user
    if (!sub) {
      throw new APIError(
        'invalid token, you need to be logged in to create a post!'
      )
    }

    const userCheck = db.getUser(sub)
    if (!userCheck) {
      throw new APIError('invalid post, specified `user` does not exist')
    }

    // validate user input
    const { title, text, category } = req.body
    if (!title || !text) {
      throw new APIError('invalid post, `title` and `text` required')
    }

    // create post
    res.send(db.createPost({ user: sub, title, text, category }))
  })

  app.post('/api/posts/:id', expressJwt, (req, res) => {
    // get username from token
    const { sub } = req.user
    if (!sub) {
      throw new APIError(
        'invalid token, you need to be logged in to edit a post!'
      )
    }

    // get current post and verify that the logged in user is the owner
    const currentPost = db.getPost(req.params.id)
    if (currentPost.user !== sub) {
      return res.status(403).send({
        error: 'user `' + sub + '` is not allowed to change post `' +
          req.params.id + '` (owner: `' + currentPost.user + '`)'
      })
    }

    // validate user input
    const { title, text, category } = req.body

    // update post
    // JSON.parse/JSON.stringify is a workaround to omit undefined values
    const updatedPost = JSON.parse(JSON.stringify({ title, text, category }))
    res.send(db.updatePost(req.params.id, updatedPost))
  })

  return {
    'GET /api/posts': 'Get all posts',
    'GET /api/posts/:id': 'Get a single post',
    'POST /api/posts': 'Create a new post',
    'POST /api/posts/:id': 'Edit an existing post'
  }
}
