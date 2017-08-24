import React from 'react'
import ReactDOM from 'react-dom'

class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 0
    }
  }

  tick () {
    const { seconds } = this.state
    this.setState({
      seconds: seconds + 1
    })
  }

  componentDidMount () {
    this.timer = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { seconds } = this.state
    return <h1>You spent {seconds} seconds on this page!</h1>
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('root')
)
