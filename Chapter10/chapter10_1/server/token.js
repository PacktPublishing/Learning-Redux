const jwt = require('jwt-simple')
const makeExpressJwt = require('express-jwt')
const { JWT_SECRET } = require('./config')

const createToken = ({ username, realname }) =>
  jwt.encode({ sub: username, name: realname }, JWT_SECRET)

const expressJwt = makeExpressJwt({ secret: JWT_SECRET })

module.exports = { createToken, expressJwt }
