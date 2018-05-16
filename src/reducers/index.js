import authentication from './authentication'
import notification from './notification'

import { combineReducers } from 'redux'

export default combineReducers({
  authentication,
  notification
})
