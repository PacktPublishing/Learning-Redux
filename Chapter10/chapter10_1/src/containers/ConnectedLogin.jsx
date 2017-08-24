import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login.jsx'
import { login } from '../actions'

const mapStateToProps = (state, props) => {
  return { error: state.error && state.error.message }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ login }, dispatch)

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
