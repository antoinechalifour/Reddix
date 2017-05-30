import React from 'react'
import InfiniteProgressWrapper from '../widgets/InfiniteProgressWrapper'

const Login = ({ actions, isLoading }) => (
  <div className='login-page'>
    <div className="login-page__content">
      <div className="login-page__title">Reddix</div>

      <div className='login-page__button'>
        {isLoading && (
          <div className='login-page__progress-wrapper'>
            <InfiniteProgressWrapper>
              <div className='login-page__progress' />
            </InfiniteProgressWrapper>
          </div>
        )}
        <button onClick={() => actions.loginRequest()}>Login with Reddit</button>
      </div>
    </div>
  </div>
)

export default Login