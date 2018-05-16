import React from 'react'
import { hot } from 'react-hot-loader'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme } from 'material-ui/styles'

import { Route } from 'react-router-dom'
import { Notification } from 'components'
import { Home, SignIn, Register } from 'containers'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#be9c91',
      main: '#8d6e63',
      dark: '#5f4339',
      contrastText: '#fff'
    },
    secondary: {
      light: '#c5ffff',
      main: '#92edd5',
      dark: '#60baa4',
      contrastText: '#402e24'
    },
    background: {
      paper: '#fff',
      default: '#fbf7ee'
    }
  }
})

const App = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={SignIn} />
      <Route path='/register' component={Register} />
      <Notification />
    </MuiThemeProvider>
  )
}

export default hot(module)(App)
