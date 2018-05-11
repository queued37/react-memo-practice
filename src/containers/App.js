import React from 'react'
import { hot } from 'react-hot-loader'
import './App.scss'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Header } from 'components'

const App = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default hot(module)(App)
