import angular from 'angular'
import ngRedux from 'ng-redux'
import { createStore } from 'redux'

import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

const app = angular.module('blog', [ ngRedux ])
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(appReducer)
  })

app.controller('posts', ($ngRedux, $scope) => {
  const mapState = (state) => {
    return { posts: state.posts }
  }

  let unsubscribe = $ngRedux.connect(mapState, { createPost, editPost })($scope)
  $scope.$on('$destroy', unsubscribe)

  $ngRedux.dispatch(createPost('dan', 'hello world'))
  $ngRedux.dispatch(createPost('johann', 'second post'))
})
