import React from 'react'
import styled from 'styled-components'

const Outer = styled.div`
  & + & {
    margin-top: 24px;
  }
`

const InputGroup = ({ children }) => {
  return (
    <Outer>
      {children}
    </Outer>
  )
}

export default InputGroup
