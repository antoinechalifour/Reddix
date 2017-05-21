import React from 'react'
import { Link } from 'react-router-dom'
import AuthFilterContainer from '../../containers/AuthFilterContainer'

const Drawer = ({ actions, subreddits }) => (
  <div className='drawer'>
    <div className="drawer__header">

    </div>
    <div className="drawer__content">
      <div className="drawer__section">
        <div>Reddix</div>
        <Link to='/'>Frontpage</Link>
      </div>

      <AuthFilterContainer
        lIn={
          <div className="drawer__section">
            <div>My subreddits</div>

            {subreddits.map(r => (
              <Link
                key={r}
                to={`/r/${r}`}
              >
                {r}
              </Link>
            ))}
          </div>
        }
      />

      <div className="drawer__section">
        <div>Settings</div>
        <Link to='/customize'>Customize Reddix</Link>

        <AuthFilterContainer
          lIn={<span onClick={() => actions.logout()}>Log out</span>}
          lOut={<span onClick={() => actions.login()}>Log In</span>}
        />
      </div>
    </div>
  </div>
)

export default Drawer