import React, { Component } from 'react'
import classnames from 'classnames'
import Drawer from './Drawer'

class DrawerLayout extends Component {
  render () {
    console.log(this.props.children)
    return (
      <div
        className={classnames('drawer-layout', {
          'drawer-layout--open': this.props.isDrawerOpen
        })}
      >
        <div className='drawer-layout__drawer'>
          <Drawer />
        </div>
        <main className='drawer-layout__content'>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default DrawerLayout