import { NAVIGATE } from '../actionTypes'

export const navigate = (pageName) => {
  return {
    type: NAVIGATE,
    page: pageName
  }
}
