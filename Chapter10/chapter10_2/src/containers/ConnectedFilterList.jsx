import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FilterList from '../components/FilterList.jsx'
import { setFilter, clearFilter } from '../actions'

const mapStateToProps = (state, props) => {
  const categories = state.posts.reduce((acc, post) => {
    if (!acc.includes(post.category)) {
      return [ ...acc, post.category ]
    }
    return acc
  }, [])

  return { categories }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ setFilter, clearFilter }, dispatch)

const ConnectedFilterList = connect(mapStateToProps, mapDispatchToProps)(FilterList)

export default ConnectedFilterList
