import React from 'react'
import { GenericLayout, Authentication } from 'components'

class SignIn extends React.Component {
  render () {
    return (
      <GenericLayout>
        <Authentication mode='login' />
      </GenericLayout>
    )
  }
}

export default SignIn
