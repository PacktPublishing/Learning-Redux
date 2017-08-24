import angular from 'angular'
import { createStore } from 'redux'

import { createPost, editPost, setFilter } from './actions'
import appReducer from './reducers'

let store = createStore(appReducer)
const unsubscribe = store.subscribe(() => {
  console.log('state changed:', store.getState())
})

const render = () => {
  root.innerHTML = ''
  const { posts } = store.getState()
  posts.forEach((post, index) => {
    const item = document.createElement('li')
    item.addEventListener('click', () =>
      store.dispatch(editPost(index, post.text + '!'))
    )
    const text = document.createTextNode(post.user + ' - ' + post.text)
    item.appendChild(text)
    root.appendChild(item)
  })
}
const stopRender = store.subscribe(render)

store.dispatch(createPost('dan', 'hello world'))
store.dispatch(createPost('johann', 'second post'))
