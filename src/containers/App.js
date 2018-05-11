import React from 'react'
import { hot } from 'react-hot-loader'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme, withStyles } from 'material-ui/styles'

import { Header } from 'components'

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
    }
  }
})

const style = {
  '@global': {
    'html, body': {
      height: '100%',
      padding: 0
    },
    body: {
      backgroundColor: '#fbf7ee'
    }
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Header />
      </div>
    </MuiThemeProvider>
  )
}

export default hot(module)(withStyles(style)(App))
