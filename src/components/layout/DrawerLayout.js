import React, { Component } from 'react'
import styled from 'styled-components'
import { RESPONSIVE_BREAKPOINT } from '../../util/constants'
import DrawerContainer from '../../containers/DrawerContainer'

const drawerWidth = '256px'

const Outer = styled.div`
  @media (max-width: ${RESPONSIVE_BREAKPOINT}) {
    overflow-x: hidden;
  }

  @media (min-width: ${RESPONSIVE_BREAKPOINT}) {
    display: flex;
    flex-direction: row;
  }
`

const Drawer = styled.div`
  background: #fff;
  z-index: 10;

  @media (max-width: ${RESPONSIVE_BREAKPOINT}) {
    height: 100vh;
    width: ${drawerWidth};
    position: fixed;
    top: 0;
    transition: left .2s ease-in;
    left: ${({ isOpen }) => isOpen ? '0' : `-${drawerWidth}`}
  }

  @media (min-width: ${RESPONSIVE_BREAKPOINT}) {
    width: ${drawerWidth};
  }
`

const Content = styled.main`
  height: 100vh;
  overflow: scroll;

  @media (max-width: ${RESPONSIVE_BREAKPOINT}) {
    position: relative;
    left: 0;
    transition: left .2s ease-in;

    ${({ isOpen }) => {
      if (isOpen) {
        return `
          left: ${drawerWidth};
          width: 100vw;
        `
      }
    }}
  }

  @media (min-width: ${RESPONSIVE_BREAKPOINT}) {
    flex: 1;
  }
`

class DrawerLayout extends Component {
  render () {
    return (
      <Outer>
        <Drawer isOpen={this.props.isDrawerOpen}>
          <DrawerContainer />
        </Drawer>
        <Content isOpen={this.props.isDrawerOpen}>
          {this.props.children}
        </Content>
      </Outer>
    )
  }
}

export default DrawerLayout
