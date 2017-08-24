import React from 'react'

import { NavLink } from 'react-router-dom'

const activeLink = {
  textDecoration: 'none',
  color: 'black'
}

const Navigation = () =>
  <div>
    <NavLink to="/" exact activeStyle={activeLink}>main</NavLink>
    {' - '}
    <NavLink to="/about" activeStyle={activeLink}>about</NavLink>
  </div>

export default Navigation
