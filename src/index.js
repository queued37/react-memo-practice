import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from 'containers'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('app'))
