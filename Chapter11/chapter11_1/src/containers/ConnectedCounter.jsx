import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Counter from '../components/Counter.jsx'
import { increment, decrement, reset } from '../actions'

const mapStateToProps = (state, props) => {
  const { counter } = state
  return { count: counter }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ increment, decrement, reset }, dispatch)

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default ConnectedCounter
