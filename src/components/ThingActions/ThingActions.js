import React from 'react'
import styled from 'styled-components'
import ActionGroup from './ActionGroup'
import Action from './Action'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  font-size: ${props => props.theme.font.size * 0.8}px;
`

const Separator = Action.extend`
  cursor: default;
`

const ThingActions = ({ children }) => {
  const result = []
  const kids = React.Children.toArray(children)
    .filter(x => x)
  const count = kids.length

  kids.forEach((child, index) => {
    result.push(child)

    if (index !== count - 1) {
      result.push(
        <ActionGroup key={Math.random()}>
          <Separator>•</Separator>
        </ActionGroup>
      )
    }
  })

  return (
    <Container>{result}</Container>
  )
}

export default ThingActions
