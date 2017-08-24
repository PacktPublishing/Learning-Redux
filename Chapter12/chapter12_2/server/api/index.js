const postsAPI = require('./posts')
const usersAPI = require('./users')

module.exports = function API (app) {
  const postsPaths = postsAPI(app)
  const usersPaths = usersAPI(app)

  const paths = Object.assign({
    'GET /api': 'Get API version and paths'
  }, postsPaths, usersPaths)

  app.get('/api', (req, res) =>
    res.send({ version: 1, paths: paths })
  )
}
