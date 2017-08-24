import React from 'react'

import User from './User.jsx'
import Timestamp from './Timestamp.jsx'

const Post = ({ user, title, text, category, created, updated }) =>
  <span>
    <b>{title}</b>: {text}
    <i>{' ~ '}<User {...user} /></i><br />
    (Created at: <Timestamp data={created} />, Updated at: <Timestamp data={updated} />)
  </span>

export default Post
