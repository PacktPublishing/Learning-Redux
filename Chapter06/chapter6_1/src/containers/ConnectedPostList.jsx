import { connect } from 'react-redux'
import PostList from '../components/PostList.jsx'

const mapStateToProps = (state, props) => {
  const filteredPosts = state.filter
    ? state.posts.filter((post) => post.category === state.filter)
    : state.posts

  return {
    posts: filteredPosts.map((post) => {
      const { user, ...rest } = post
      const userObj = state.users.find(
        ({ username }) => user === username
      )
      return {
        user: userObj,
        ...rest,
      }
    }),
  }
}

const ConnectedPostList = connect(mapStateToProps)(PostList)

export default ConnectedPostList

