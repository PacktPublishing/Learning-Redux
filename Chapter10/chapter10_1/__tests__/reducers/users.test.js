import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import nock from 'nock'

import { fetchUser } from '../../src/actions'
import usersReducer from '../../src/reducers/users'

const middlewares = [ thunk ]
let store

beforeEach(() => {
  store = createStore(usersReducer, applyMiddleware(thunk))
})

afterEach(() => {
  nock.cleanAll()
})

test('initial state should be empty array (no users)', () => {
  expect(store.getState()).toEqual([])
})

test('fetchUser action should add user object to state', () => {
  const username = 'dan'
  const realname = 'Daniel Bugl'
  const userObj = { username, realname }

  nock('http://localhost:8080/')
    .get(`/api/users/${username}`)
    .reply(200, userObj)

  expect.assertions(1)

  const action = fetchUser(username)
  return store.dispatch(action)
    .then(() =>
      expect(store.getState()).toContainEqual(userObj)
    )
})
