import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

const Header = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton color='inherit' aria-label='Menu'>
            <SearchIcon />
          </IconButton>
          <Typography variant='title' color='inherit' className={classes.flex}>
            Memo Practice
          </Typography>
          {props.isSignedIn
            ? <Button color='inherit'>Sign out</Button>
            : <Button color='inherit'>Sign in</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object,
  isSignedIn: PropTypes.bool,
  onLogout: PropTypes.func
}

Header.defaultProps = {
  isSignedIn: false,
  onLogout: () => { console.error('onLogout not defined') }
}

export default withStyles(styles)(Header)
