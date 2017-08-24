import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ErrorMessage from '../components/ErrorMessage.jsx'

const mapStateToProps = (state, props) => {
  return {
    message: state.error && state.error.message
  }
}

const ConnectedErrorMessage = withRouter(connect(mapStateToProps)(ErrorMessage))

export default ConnectedErrorMessage
