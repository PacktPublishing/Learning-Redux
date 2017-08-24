import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Counter from '../components/Counter.jsx'
import { increment, decrement, reset } from '../actions'
import { ActionCreators } from 'redux-undo'
const { undo, redo } = ActionCreators

const mapStateToProps = (state, props) => {
  const { counter } = state

  return { count: counter && counter.present }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ increment, decrement, reset, undo, redo }, dispatch)

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default ConnectedCounter
