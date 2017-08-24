import thunkMiddleware from 'redux-thunk'
import { applyMiddleware } from 'redux'

const middleware = applyMiddleware(
  thunkMiddleware
)

export default middleware
