import { CREATE_USER } from '../actionTypes'

export const createUser = (username, realname) => {
  return {
    type: CREATE_USER,
    username,
    realname,
  }
}

