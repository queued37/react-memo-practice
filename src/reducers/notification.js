import * as types from 'constants/NotificationActions'
import update from 'immutability-helper'

const initialState = {
  isOpen: false,
  isBeingClosed: false,
  messageQueue: []
}

function notify (state, action) {
  let queue = [...state.messageQueue, action.message] // Immutable push
  let isOpen = true
  if (state.isOpen || state.isBeingClosed) {
    isOpen = false
  }
  return update(state, {
    isOpen: { $set: isOpen },
    messageQueue: { $set: queue }
  })
}

function dismiss (state) {
  return update(state, {
    isOpen: { $set: false },
    isBeingClosed: { $set: true }
  })
}

function exited (state) {
  let queue = state.messageQueue.slice(1) // Process next message in queue
  let isOpen = queue.length > 0 // Open next message if queue is not empty
  return update(state, {
    isOpen: { $set: isOpen },
    isBeingClosed: { $set: false },
    messageQueue: { $set: queue }
  })
}

export default function notification (state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }
  switch (action.type) {
    case types.NOTIFY:
      return notify(state, action)

    case types.DISMISS:
      return dismiss(state)

    case types.EXITED:
      return exited(state)

    default:
      return state
  }
}
