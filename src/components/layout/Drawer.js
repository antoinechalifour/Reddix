import React from 'react'
import { Link } from 'react-router-dom'

const Drawer = () => (
  <div className='drawer'>
    <div className="drawer__header">

    </div>
    <div className="drawer__content">
      <div className="drawer__section">
        <div>Settings</div>
        <Link to='/customize'>Customize Reddix</Link>
        <Link to='/customize'>Log In</Link>
      </div>
    </div>
  </div>
)

export default Drawer