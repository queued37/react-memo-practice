import React from 'react'
import { GenericLayout, Authentication } from 'components'

class Register extends React.Component {
  render () {
    return (
      <GenericLayout>
        <Authentication mode='register' />
      </GenericLayout>
    )
  }
}

export default Register
