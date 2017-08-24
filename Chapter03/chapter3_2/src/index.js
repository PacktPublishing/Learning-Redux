import React from 'react'
import ReactDOM from 'react-dom'

const Greeting = ({ name }) => {
  const uppercaseName = name.toUpperCase()
  return (
    <h1>
      hello {uppercaseName}!
    </h1>
  )
}

const App = () => (
  <div>
    <Greeting name="Daniel" />
    <Greeting name="Destiny" />
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
