const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const express = require('express')
const app = express()

const APIError = require('./api/APIError')

app.set('json spaces', 2)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./api')(app)

const serveFrontend = require('./serveFrontend')(path.join(__dirname, '/..'))
app.use(serveFrontend)

app.use(function errorHandler (err, req, res, next) {
  if (err instanceof APIError) {
    return res.status(400).send({ error: err.message })
  }
  return next(err)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  const reset = '\x1b[0m'
  const bright = '\x1b[1m'
  const underscore = '\x1b[4m'
  const fgBlue = '\x1b[34m'

  console.log('serving %sfrontend%s on: %shttp://localhost:%s/%s',
              bright, reset, bright + underscore + fgBlue, port, reset)
  console.log('serving %sbackend%s on:  %shttp://localhost:%s/api/%s',
              bright, reset, bright + underscore + fgBlue, port, reset)
})
