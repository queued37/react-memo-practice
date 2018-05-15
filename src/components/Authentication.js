import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography, TextField, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const style = theme => ({
  root: {
    margin: '0 auto 0 auto',
    paddingTop: 100,
    width: 400
  },
  header: {
    padding: '20px 30px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center'
  },
  main: {
    margin: '0 30px 20px 30px'
  },
  footer: {
    padding: '20px 30px',
    borderTop: '1px solid #eee',
    textAlign: 'right'
  },

  title: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'center'
  },
  textField: {
    display: 'block'
  },
  button: {
    display: 'block',
    margin: '20px 0 0 auto'
  },
  link: {
    color: theme.palette.secondary.dark,
    textDecoration: 'none'
  }
})

class Authentication extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const nextState = {[e.target.name]: e.target.value}
    this.setState(nextState)
  }

  render () {
    const { username, password, confirmPassword } = this.state
    const { classes, mode, onLogin } = this.props

    const loginView = (
      <div>
        <Typography variant='headline' className={classes.header}>Sign in</Typography>
        <div className={classes.main}>
          <form>
            <TextField
              label='Username'
              name='username'
              type='username'
              onChange={this.handleInputChange}
              className={classes.textField}
              margin='normal'
              fullWidth
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              onChange={this.handleInputChange}
              className={classes.textField}
              margin='normal'
              fullWidth
            />
            <Button
              variant='raised'
              color='primary'
              className={classes.button}
              onClick={() => onLogin(username, password)}
            >
              Sign in
            </Button>
          </form>
        </div>
        <div className={classes.footer}>
          <Typography>
            Not a member? <Link to='/register' className={classes.link}>Register now!</Link>
          </Typography>
        </div>
      </div>
    )

    const registerView = (
      <div>
        <Typography variant='headline' className={classes.header}>Register</Typography>
        <div className={classes.main}>
          <form>
            <TextField
              label='Username'
              name='username'
              type='username'
              onChange={this.handleInputChange}
              className={classes.textField}
              margin='normal'
              fullWidth
            />
            <TextField
              label='Password'
              name='password'
              type='password'
              onChange={this.handleInputChange}
              className={classes.textField}
              margin='normal'
              fullWidth
            />
            <TextField
              label='Confirm password'
              name='confirmPassword'
              type='password'
              onChange={this.handleInputChange}
              className={classes.textField}
              margin='normal'
              fullWidth
            />
            <Button
              variant='raised'
              color='primary'
              className={classes.button}
              onClick={() => {}}
            >
              Register
            </Button>
          </form>
        </div>
        <div className={classes.footer}>
          <Typography>
            Already a member? <Link to='/login' className={classes.link}>Sign in</Link>
          </Typography>
        </div>
      </div>
    )

    return (
      <div className={classes.root}>
        <Typography variant='display3' className={classes.title}>Memo Practice</Typography>
        <Paper className={classes.paper}>
          { mode === 'login'
            ? loginView
            : registerView }
        </Paper>
      </div>
    )
  }
}

Authentication.propTypes = {
  classes: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['login', 'register']).isRequired,
  onLogin: PropTypes.func.isRequired
}

export default withStyles(style)(Authentication)
