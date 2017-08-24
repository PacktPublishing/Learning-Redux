import { connect } from 'react-redux'

import Router from '../components/Router.jsx'

const mapStateToProps = (state, props) => {
  const { route } = state
  return { route }
}

const ConnectedRouter = connect(mapStateToProps)(Router)

export default ConnectedRouter
