import * as types from 'constants/ActionTypes'
import axios from 'axios'

export const login = () => ({type: types.AUTH_LOGIN})
export const loginSuccess = username => ({type: types.AUTH_LOGIN_SUCCESS, username})
export const loginFailure = () => ({type: types.AUTH_LOGIN_FAILURE})

// Thunks
export const loginRequest = (username, password) => {
  return (dispatch) => {
    dispatch(login())

    // Return API call promise
    return axios.post('/api/account/login', { username, password })
      .then(response => {
        dispatch(loginSuccess(username))
      }).catch(error => {
        console.error(error)
        dispatch(loginFailure())
      })
  }
}
