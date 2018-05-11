import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App, Home, SignIn, Register } from 'containers'

ReactDOM.render(
  <Router>
    <App>
      <Route exact path='/' component={Home} />
      <Route path='/sign-in' component={SignIn} />
      <Route path='/register' component={Register} />
    </App>
  </Router>, document.getElementById('app'))
