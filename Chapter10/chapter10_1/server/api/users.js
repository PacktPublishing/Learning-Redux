const db = require('../db')
const APIError = require('./APIError')

const { createToken, expressJwt } = require('../token')

const { PASSWORD_HMAC_SECRET } = require('../config')
const crypto = require('crypto')

const hashPassword = (pw) =>
  crypto.createHmac('sha256', PASSWORD_HMAC_SECRET)
        .update(pw)
        .digest('hex')

const cleanUser = (user) =>
  Object.assign({}, user, { password: undefined })

const cleanUserPublic = (user) =>
  Object.assign({}, cleanUser(user), { token: undefined })

module.exports = function usersAPI (app) {
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      throw new APIError('invalid request, `username` and `password` required')
    }

    const user = db.getUser(username)
    if (!user || (user.password !== hashPassword(password))) {
      throw new APIError('invalid username or password')
    }

    const tokenedUser = db.updateUser(user.username, {
      token: createToken(user)
    })

    res.send(cleanUser(tokenedUser))
  })

  app.get('/api/users', (req, res) =>
    res.send(db.getUsers().map(cleanUserPublic))
  )

  app.get('/api/users/:username', (req, res) =>
    res.send(cleanUserPublic(db.getUser(req.params.username)))
  )

  app.post('/api/users', (req, res) => {
    // validate user input
    const { username, realname, password } = req.body
    if (!username || !realname || !password) {
      throw new APIError(
        'invalid user, `username`, `realname` and `password` required'
      )
    }

    // check if username is available
    const userCheck = db.getUser(username)
    if (userCheck) {
      throw new APIError('invalid user, `username` already taken')
    }

    // create user
    res.send(cleanUser(db.createUser({
      username, realname,
      password: hashPassword(password),
      token: createToken({ username, realname })
    })))
  })

  app.post('/api/users/:username', expressJwt, (req, res) => {
    // validate user input
    const { realname, password } = req.body

    // get user information from token
    const { sub } = req.user
    if (!sub) {
      throw new APIError(
        'invalid token, you need to be logged in to edit a post!'
      )
    }

    // ensure we are editing the logged in user
    if (req.params.username !== sub) {
      return res.status(403).send({
        error: 'user `' + sub + '` is not allowed to change user `' +
          req.params.username + '`'
      })
    }

    // update user
    // JSON.parse/JSON.stringify is a workaround to omit undefined values
    const updatedUser = JSON.parse(JSON.stringify({ realname }))
    res.send(cleanUser(db.updateUser(sub, updatedUser)))
  })

  return {
    'POST /api/login': 'Log in as a user',
    'GET /api/users': 'Get all users',
    'GET /api/users/:username': 'Get a single user',
    'POST /api/users': 'Create a new user',
    'POST /api/users/:username': 'Edit an existing user'
  }
}
