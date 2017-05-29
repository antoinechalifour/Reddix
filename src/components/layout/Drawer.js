import React from 'react'
import { Link } from 'react-router-dom'

const Drawer = ({ actions, subreddits, me }) => (
  <div className='drawer'>
    <div className="drawer__header">
      <div className='drawer__me'>
        {me.subreddit && (
          <img
            className='drawer__me__avatar'
            alt='My profile'
            src={me.subreddit.icon_img}
          />
        )}
        {!me.subreddit && (
          <div
            className='drawer__me__avatar drawer__me__avatar--default'
          >
            {me.name.substr(0, 1)}
          </div>
        )}
        <Link to='/me'>/u/{me.name}</Link>
      </div>
    </div>
    <div className="drawer__content">
      <div className="drawer__section">
        <div>Reddix</div>
        <Link to='/'>Frontpage</Link>
      </div>

      <div className="drawer__section">
        <div>My subs</div>

        {subreddits.map(r => (
          <Link
            key={r.id}
            to={`/r/${r.display_name}`}
          >
            {r.display_name_prefixed}
          </Link>
        ))}
      </div>

      <div className="drawer__section">
        <div>Settings</div>
        <Link to='/customize'>Customize Reddix</Link>

        <span onClick={() => actions.logoutRequest()}>Log out</span>
      </div>
    </div>
  </div>
)

export default Drawer