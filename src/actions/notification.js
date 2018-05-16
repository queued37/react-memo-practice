import * as types from 'constants/NotificationActions'

export const notify = message => ({ type: types.NOTIFY, message })
export const dismiss = () => ({ type: types.DISMISS })
export const exited = () => ({ type: types.EXITED })
