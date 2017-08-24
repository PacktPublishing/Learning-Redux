import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

let state = appReducer(undefined, { type: 'INIT_ACTION' })
console.log('initial state:', state)

state = appReducer(state, createPost('dan', 'test'))
console.log('state after createPost:', state)

state = appReducer(state, editPost(0, 'edited post'))
console.log('state after editPost:', state)

state = appReducer(state, setFilter('none'))
console.log('state after setFilter:', state)
