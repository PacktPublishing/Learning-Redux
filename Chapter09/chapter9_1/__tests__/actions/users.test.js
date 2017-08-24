import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import { fetchUser } from '../../src/actions'
import * as actionTypes from '../../src/actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
let store

beforeEach(() => {
  store = mockStore({ users: [] })
})

afterEach(() => {
  nock.cleanAll()
})

describe('fetching user', () => {
  test('dispatches FETCH_USER_SUCCESS when fetching succeeds', () => {
    const username = 'dan'
    const realname = 'Daniel Bugl'
    const userObj = { username, realname }

    nock('http://localhost:8080/')
      .get(`/api/users/${username}`)
      .reply(200, userObj)

    const expectedActions = [
      { type: actionTypes.FETCH_USER_REQUEST },
      { type: actionTypes.FETCH_USER_SUCCESS, result: userObj }
    ]

    expect.assertions(1)

    return store.dispatch(fetchUser(username))
      .then(() =>
        expect(store.getActions()).toEqual(expectedActions)
      )
  })

  test('dispatches FETCH_USER_FAILURE when fetching fails', () => {
    const username = 'nonexistant'
    const errorMsg = 'user not found'

    nock('http://localhost:8080/')
      .get(`/api/users/${username}`)
      .reply(404, { error: errorMsg })

    const expectedActions = [
      { type: actionTypes.FETCH_USER_REQUEST },
      { type: actionTypes.FETCH_USER_FAILURE, error: new Error(errorMsg) }
    ]

    expect.assertions(1)

    return store.dispatch(fetchUser(username))
      .catch(() =>
        expect(store.getActions()).toEqual(expectedActions)
      )
  })
})
