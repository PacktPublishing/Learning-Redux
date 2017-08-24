import { setFilter, clearFilter } from '../../src/actions'
import { SET_FILTER, CLEAR_FILTER } from '../../src/actionTypes'

test('setFilter should create an action to set the filter', () => {
  const category = 'test'
  const expectedAction = {
    type: SET_FILTER,
    filter: category
  }
  expect(setFilter(category)).toEqual(expectedAction)
})

test('clearFilter should create an action to clear the filter', () => {
  const expectedAction = {
    type: CLEAR_FILTER
  }
  expect(clearFilter()).toEqual(expectedAction)
})
