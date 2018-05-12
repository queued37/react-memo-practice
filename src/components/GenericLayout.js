import React from 'react'
import { withStyles } from 'material-ui/styles'

const style = theme => ({
  '@global': {
    'html, body': {
      height: '100%',
      margin: 0
    },
    body: {
      backgroundColor: theme.palette.background.default
    }
  }
})

const GenericLayout = ({ children }) => (
  <div>
    { children }
  </div>
)

export default withStyles(style)(GenericLayout)
