import React from 'react'

export default class HiddenContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = { isVisible: false }
  }

  render () {
    const { title, children } = this.props
    const { isVisible } = this.state

    if (!isVisible) {
      return (
        <span>
          <a href="javascript:void(0)" onClick={() => this.setState({ isVisible: true })}>
            {title} &#9656;
          </a>
        </span>
      )
    }

    return (
      <span>
        <a href="javascript:void(0)" onClick={() => this.setState({ isVisible: false })}>
          {title} &#9662;
        </a>
        <div>{children}</div>
      </span>
    )
  }
}
