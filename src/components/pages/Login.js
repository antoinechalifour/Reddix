import React from 'react'

const Login = ({ actions }) => (
  <div className='login-page'>
    <div className="login-page__content">
      <div className="login-page__title">Reddix</div>

      <button onClick={() => actions.login()}>Login with Reddit</button>
    </div>
  </div>
)

export default Login