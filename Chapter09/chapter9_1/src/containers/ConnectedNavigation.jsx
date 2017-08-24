import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Navigation from '../components/Navigation.jsx'
import { navigate } from '../actions'

const mapStateToProps = (state, props) => {
  const { route } = state
  return { route }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ navigate }, dispatch)

const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation)

export default ConnectedNavigation
