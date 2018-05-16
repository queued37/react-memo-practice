import React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
// import Button from 'material-ui/Button'
import { dismiss, exited } from 'actions/notification'

class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  handleDismiss (event, reason) {
    // if (reason === "clickaway") {
    //   return;
    // }
    this.props.dismiss()
  }

  render () {
    const { isOpen, message, exited } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={this.handleDismiss}
        onExited={exited}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{message}</span>}
        // action={[
        //   <Button
        //     key='undo'
        //     color='secondary'
        //     size='small'
        //     onClick={this.handleDismiss}
        //   >
        //     UNDO
        //   </Button>
        // ]}
      />
    )
  }
}

const mapStateToProps = state => {
  let message
  if (state.notification.messageQueue.length > 0) {
    message = state.notification.messageQueue[0]
  } else {
    message = ''
  }

  return { isOpen: state.notification.isOpen, message }
}

const mapDispatchToProps = dispatch => ({
  dismiss: () => {
    dispatch(dismiss())
  },
  exited: () => {
    dispatch(exited())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
