import { connect } from 'react-redux'

import Loading from '../components/Loading.jsx'

const mapStateToProps = (state, props) => {
  const { loading } = state

  const isLoading = Object.keys(loading).reduce((result, requestName) => {
    if (result === true) return true
    if (loading[requestName] > 0) return true
    return false
  }, false)

  return { isLoading }
}

const ConnectedLoading = connect(mapStateToProps)(Loading)

export default ConnectedLoading
