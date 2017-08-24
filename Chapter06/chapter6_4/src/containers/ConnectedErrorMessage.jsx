import { connect } from 'react-redux'

import ErrorMessage from '../components/ErrorMessage.jsx'

const mapStateToProps = (state, props) => {
  return {
    message: state.error && state.error.message
  }
}

const ConnectedErrorMessage = connect(mapStateToProps)(ErrorMessage)

export default ConnectedErrorMessage
