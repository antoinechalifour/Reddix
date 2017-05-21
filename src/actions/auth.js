export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const login = () => ({
  type: LOGIN
})

export const loginSuccess = client => ({
  type: LOGIN_SUCCESS,
  client
})