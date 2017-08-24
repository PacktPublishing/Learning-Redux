import React from 'react'

import HiddenContent from './HiddenContent.jsx'

export default class Registration extends React.Component {
  constructor (props) {
    super(props)

    this.state = { username: '', realname: '', message: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handleRealname = this.handleRealname.bind(this)
  }

  handleUsername (evt) {
    this.setState({ username: evt.target.value })
  }

  handleRealname (evt) {
    this.setState({ realname: evt.target.value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.createUser(this.state.username, this.state.realname)
    this.setState({ message: 'Successfully created user!' })
  }

  render () {
    return (
      <HiddenContent title="Register">
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input type="text"
                   value={this.state.username}
                   onChange={this.handleUsername}
            />
          </div>
          <div>
            Real name:
            <input type="text"
                   value={this.state.realname}
                   onChange={this.handleRealname}
            />
          </div>
          <input type="submit" value="Create account" />
          <div style={{ color: 'green' }}>
            {!this.props.error ? this.state.message : ''}
          </div>
        </form>
      </HiddenContent>
    )
  }
}
