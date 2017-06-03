import React, { Component } from 'react'
import classnames from 'classnames'
import DrawerContainer from '../../containers/DrawerContainer'

class DrawerLayout extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.side && nextProps.side !== this.props.side) {
      this.iframeLoaded = false

      this.timeout = setTimeout(() => {
        if (!this.iframeLoaded) {
          // The iframe took too long to load (might)
          // be that the website does not allow iframes
          // So we hide the side panel and open the link
          // in an other tab
          console.log('Failed')
        }
      }, 2000)
    }
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

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
          <div className='drawer-layout__page'>
            {this.props.children}
          </div>

          {this.props.side && (
            <iframe
              className='drawer-layout__reader'
              title={this.props.side}
              src={this.props.side}
              ref={e => (this.iframe = e)}
              onLoad={() => {
                console.log('Loaded')
                console.log(this.iframe)
                this.iframeLoaded = true
                window.iframe = this.iframe
              }}
            />
          )}
        </main>
      </div>
    )
  }
}

export default DrawerLayout
