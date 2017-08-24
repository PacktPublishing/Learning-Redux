import React from 'react'

import ConnectedRegistration from '../containers/ConnectedRegistration.jsx'
import ConnectedCreatePost from '../containers/ConnectedCreatePost.jsx'
import ConnectedLogin from '../containers/ConnectedLogin.jsx'
import User from './User.jsx'

const Header = ({ store, session }) =>
  <div>
    { !session && <div><ConnectedRegistration store={store} /></div> }
    { !session && <div><ConnectedLogin store={store} /></div> }
    { session &&
      <div>
        <b>Logged in as:</b>{' '}
        <User {...session} />
      </div>
    }
    { session && <div><ConnectedCreatePost store={store} /></div> }
 </div>

export default Header
