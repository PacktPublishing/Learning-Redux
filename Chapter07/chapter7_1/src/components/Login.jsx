import React from 'react'

import HiddenContent from './HiddenContent.jsx'

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = { username: '', password: '', message: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleUsername (evt) {
    this.setState({ username: evt.target.value })
  }

  handlePassword (evt) {
    this.setState({ password: evt.target.value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    // TODO
    this.setState({ message: 'Login not implemented yet!' })
  }

  render () {
    return (
      <HiddenContent title="Login">
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input type="text"
                   value={this.state.username}
                   onChange={this.handleUsername}
            />
          </div>
          <div>
            Password:
            <input type="password"
                   value={this.state.password}
                   onChange={this.handlePassword}
            />
          </div>
          <input type="submit" value="Login" />
          <div style={{ color: 'green' }}>
            {!this.props.error ? this.state.message : ''}
          </div>
        </form>
      </HiddenContent>
    )
  }
}
