import React from 'react'

import HiddenContent from './HiddenContent.jsx'

export default class CreatePost extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '', title: '', text: '', category: '', message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }

  handleUsername (evt) {
    this.setState({ username: evt.target.value })
  }

  handleTitle (evt) {
    this.setState({ title: evt.target.value })
  }

  handleText (evt) {
    this.setState({ text: evt.target.value })
  }

  handleCategory (evt) {
    this.setState({ category: evt.target.value })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    const { username, title, text, category } = this.state
    this.props.createPost(username, { title, text, category })
    this.setState({ message: 'Successfully created post!' })
  }

  render () {
    return (
      <HiddenContent title="New post">
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input type="text"
                   value={this.state.username}
                   onChange={this.handleUsername}
            />
          </div>
          <div>
            Title:
            <input type="text"
                   value={this.state.title}
                   onChange={this.handleTitle}
            />
          </div>
          <div>
            Text:
            <textarea value={this.state.text} onChange={this.handleText} />
          </div>
          <div>
            Category:
            <input type="text"
                   value={this.state.category}
                   onChange={this.handleCategory}
            />
          </div>
          <input type="submit" value="Create post" />
          <div style={{ color: 'green' }}>
            {!this.props.error ? this.state.message : ''}
          </div>
        </form>
      </HiddenContent>
    )
  }
}
