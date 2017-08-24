import React from 'react'
import PostList from '../components/PostList.jsx'

export default class ConnectedPostList extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.store.getState()
  }

  componentDidMount () {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.setState({ ...store.getState() })
    )
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return <PostList {...this.state} />
  }
}

