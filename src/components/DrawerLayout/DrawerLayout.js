import React, { Component } from 'react'
import styled from 'styled-components'
import Drawer from './components/Drawer'

const drawerWidth = '256px'

const Outer = styled.div`
  @media (max-width: ${props => props.theme.dimens.breakpoint}) {
    overflow-x: hidden;
  }

  @media (min-width: ${props => props.theme.dimens.breakpoint}) {
    display: flex;
    flex-direction: row;
  }
`

const StyledDrawer = styled.div`
  background: #fff;
  z-index: 10;

  @media (max-width: ${props => props.theme.dimens.breakpoint}) {
    height: 100vh;
    width: ${drawerWidth};
    position: fixed;
    top: 0;
    transition: left .2s ease-in;
    left: ${({ isOpen }) => isOpen ? '0' : `-${drawerWidth}`}
  }

  @media (min-width: ${props => props.theme.dimens.breakpoint}) {
    width: ${drawerWidth};
  }
`

const Content = styled.main`
  min-height: 100vh;

  @media (max-width: ${props => props.theme.dimens.breakpoint}) {
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

  @media (min-width: ${props => props.theme.dimens.breakpoint}) {
    flex: 1;
  }
`

class DrawerLayout extends Component {
  render () {
    return (
      <Outer>
        <StyledDrawer isOpen={this.props.isDrawerOpen}>
          <Drawer />
        </StyledDrawer>
        <Content isOpen={this.props.isDrawerOpen}>
          {this.props.children}
        </Content>
      </Outer>
    )
  }
}

export default DrawerLayout
