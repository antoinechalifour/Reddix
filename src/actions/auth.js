export const LOGIN = 'LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT = 'LOGOUT'

export const login = () => ({
  type: LOGIN
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = client => ({
  type: LOGIN_SUCCESS,
  client
})

export const logoutRequest = () => ({ type: LOGOUT_REQUEST })

export const logout = () => ({ type: LOGOUT })