const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const PASSWORD_HMAC_SECRET = process.env.PASSWORD_HMAC_SECRET || 'pwsecret'

module.exports = { JWT_SECRET, PASSWORD_HMAC_SECRET }
