import angular from 'angular'
import { createStore } from 'redux'

import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

let store = createStore(appReducer)
const unsubscribe = store.subscribe(() => {
  console.log('state changed:', store.getState())
})

const app = angular.module('blog', [])
app.controller('posts', ($scope) => {
  const { posts } = store.getState()
  $scope.posts = posts
})

store.dispatch(createPost('dan', 'hello world'))
store.dispatch(createPost('johann', 'second post'))
