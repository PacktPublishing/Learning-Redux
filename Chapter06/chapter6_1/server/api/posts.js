const db = require('../db')
const APIError = require('./APIError')

module.exports = function postsAPI (app) {
  app.get('/api/posts', (req, res) =>
    res.send(db.getPosts())
  )

  app.get('/api/posts/:id', (req, res) =>
    res.send(db.getPost(req.params.id))
  )

  app.post('/api/posts', (req, res) => {
    // validate user input
    const { user, title, text, category } = req.body
    // TODO: later, we will automatically set the `user` value to the
    //       currently logged in user
    if (!user || !title || !text) {
      throw new APIError('invalid post, `user`, `title` and `text` required')
    }

    const userCheck = db.getUser(user)
    if (!userCheck) {
      throw new APIError('invalid post, specified `user` does not exist')
    }

    // create post
    res.send(db.createPost({ user, title, text, category }))
  })

  app.post('/api/posts/:id', (req, res) => {
    // validate user input
    const { title, text, category } = req.body
    // TODO: later, we will verify that the post actually belongs to the
    //       currently logged in user

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
