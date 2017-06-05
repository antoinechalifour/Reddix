import React, { Component } from 'react'
import styled from 'styled-components'
import {
  PRIMARY_COLOR,
  FONT_FAMILY_SECONDARY,
  BOX_SHADOW_1
} from '../util/constants'

const TabListOuter = styled.div`
  display: flex;
  flex-direction: row;

  background: #fff;
  box-shadow: ${BOX_SHADOW_1}
`

export const TabList = ({
  className,
  children,
  activeIndex,
  onClick
}) => {
  const kids = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      active: activeIndex === index,
      onClick: () => onClick(index)
    })
  })

  return <TabListOuter className={className}>{kids}</TabListOuter>
}

const TabOuter = styled.div`
  padding: 16px 0;
  flex: 1;

  text-align:center;
  text-transform: uppercase;
  cursor: pointer;
  font-family: ${FONT_FAMILY_SECONDARY};

  ${({ active }) => {
    if (active) {
      return `border-bottom: 4px solid ${PRIMARY_COLOR};`
    }

    return `border-bottom: 4px solid transparent;`
  }}

  transition: border-bottom .2s ease-in;
`

export const Tab = ({
  children,
  onClick,
  active
}) => {
  return (
    <TabOuter
      onClick={onClick}
      active={active}
    >
      {children}
    </TabOuter>
  )
}

export const TabPanels = ({ children, activeIndex }) => {
  return (
    <div>{children[activeIndex]}</div>
  )
}

export class Tabs extends Component {
  constructor (props) {
    super(props)

    this.state = { activeIndex: 0 }
  }

  render () {
    const children = React.Children.map(this.props.children, child => {
      if (
        child.type === TabPanels ||
        (child.type.displayName && child.type.displayName.indexOf('TabPanels') !== -1) // Hack for styled components
      ) {
        return React.cloneElement(child, { activeIndex: this.state.activeIndex })
      } else if (
        child.type === TabList ||
        (child.type.displayName && child.type.displayName.indexOf('TabList') !== -1) // Hack for styled components
      ) {
        return React.cloneElement(child, {
          activeIndex: this.state.activeIndex,
          onClick: activeIndex => this.setState({ activeIndex })
        })
      }

      return child
    })

    return (
      <div>{children}</div>
    )
  }
}

export default Tabs
