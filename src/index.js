import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App, Home, SignIn, Register } from 'containers'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/register' component={Register} />
      </App>
    </Router>
  </Provider>, document.getElementById('app'))
