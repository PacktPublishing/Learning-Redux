function APIError (message) {
  this.name = 'APIError'
  this.message = message || ''
}
APIError.prototype = Error.prototype

module.exports = APIError
