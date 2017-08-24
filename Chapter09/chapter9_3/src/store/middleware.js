import { applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

const middleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history)
)

export default middleware
