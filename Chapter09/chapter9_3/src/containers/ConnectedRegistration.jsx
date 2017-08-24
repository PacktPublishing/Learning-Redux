import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Registration from '../components/Registration.jsx'
import { createUser } from '../actions'

const mapStateToProps = (state, props) => {
  return { error: state.error && state.error.message }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ createUser }, dispatch)

const ConnectedRegistration = connect(mapStateToProps, mapDispatchToProps)(Registration)

export default ConnectedRegistration
