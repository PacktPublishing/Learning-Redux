import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CreatePost from '../components/CreatePost.jsx'
import { createPost } from '../actions'

const mapStateToProps = (state, props) => {
  return { error: state.error && state.error.message }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ createPost }, dispatch)

const ConnectedCreatePost = connect(mapStateToProps, mapDispatchToProps)(CreatePost)

export default ConnectedCreatePost
