import React from 'react'
import { GenericLayout, Authentication } from 'components'
import { connect } from 'react-redux'
import { loginRequest } from 'actions/authentication'
import { withRouter } from 'react-router-dom'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (username, password) {
    return this.props.loginRequest(username, password).then(
      () => {
        if (this.props.status === 'SUCCESS') {
          let loginData = {
            isLoggedIn: true,
            username
          }

          console.log('Success', loginData)
          document.cookie = 'key=' + window.btoa(JSON.stringify(loginData))
          this.props.history.push('/')
          return true
        } else {
          console.log('Failure')
          return false
        }
      },
      error => {
        console.error(error)
      }
    )
  }

  render () {
    return (
      <GenericLayout>
        <Authentication mode='login' onLogin={this.handleLogin} />
      </GenericLayout>
    )
  }
}

const mapStateToProps = state => ({
  status: state.authentication.login.status
})

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => {
    return dispatch(loginRequest(username, password))
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
)
