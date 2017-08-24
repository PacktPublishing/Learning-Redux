import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/Login.jsx'

const mapStateToProps = (state, props) => {
  return { error: state.error && state.error.message }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ /* TODO */ }, dispatch)

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
