import React from 'react'
import { Link } from 'react-router-dom'
import {
  IfLoggedIn,
  IfAnonymous
} from '../../containers/FeatureToggle'

const Drawer = ({ actions, subreddits, me }) => (
  <div className='drawer'>
    <div className="drawer__header">
      <IfLoggedIn>
        {() => (
          <div className='drawer__me'>
            <img src={me.subreddit.icon_img} />
            <div>/u/{me.name}</div>
          </div>
        )}
      </IfLoggedIn>
    </div>
    <div className="drawer__content">
      <div className="drawer__section">
        <div>Reddix</div>
        <Link to='/'>Frontpage</Link>
      </div>

      <IfLoggedIn>
        {() => (
          <div className="drawer__section">
            <div>My subs</div>

            {subreddits.map(r => (
              <Link
                key={r}
                to={`/r/${r}`}
              >
                {r}
              </Link>
            ))}
          </div>
        )}
      </IfLoggedIn>

      <div className="drawer__section">
        <div>Settings</div>
        <Link to='/customize'>Customize Reddix</Link>

        <IfLoggedIn>
          {() => <span onClick={() => actions.logoutRequest()}>Log out</span>}
        </IfLoggedIn>
        <IfAnonymous>
          {() => <span onClick={() => actions.login()}>Log In</span>}
        </IfAnonymous>
      </div>
    </div>
  </div>
)

export default Drawer