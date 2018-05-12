import React from 'react'
import Header from './Header'
import { withStyles } from 'material-ui/styles/index'

const style = theme => ({
  '@global': {
    'html, body': {
      height: '100%',
      margin: 0
    },
    body: {
      backgroundColor: theme.palette.background.default
    }
  },
  content: {
    marginTop: 80
  }
})

const HeaderLayout = ({ classes, children }) => (
  <div>
    <Header />
    <div className={classes.content}>
      { children }
    </div>
  </div>
)

export default withStyles(style)(HeaderLayout)
