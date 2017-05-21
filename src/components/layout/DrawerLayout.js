import React, { Component } from 'react'
import classnames from 'classnames'
import DrawerContainer from '../../containers/DrawerContainer'

class DrawerLayout extends Component {
  render () {
    return (
      <div
        className={classnames('drawer-layout', {
          'drawer-layout--open': this.props.isDrawerOpen
        })}
      >
        <div className='drawer-layout__drawer'>
          <DrawerContainer />
        </div>
        <main className='drawer-layout__content'>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default DrawerLayout