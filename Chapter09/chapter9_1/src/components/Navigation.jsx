import React from 'react'

const isClickable = (route, currentRoute) =>
  route === currentRoute ? null : 'javascript:void(0)'

const Navigation = ({ navigate, route }) =>
  <div>
    <a href={isClickable('main', route)} onClick={() => navigate('main')}>main</a>
    {' - '}
    <a href={isClickable('about', route)} onClick={() => navigate('about')}>about</a>
  </div>

export default Navigation
