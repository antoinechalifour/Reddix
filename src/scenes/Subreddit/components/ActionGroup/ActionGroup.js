import React from 'react'
import styled from 'styled-components'
import { PRIMARY_COLOR } from 'Util/constants'

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 12px;
  font-size: 20px;

  svg {
    cursor: pointer;
    color: #bcbcbc;

    + * {
      margin-top: 16px;
    }

    ${({ active }) => {
      if (active) {
        return `color: ${PRIMARY_COLOR}`
      }
    }}
  }
`

const ActionGroup = ({ children }) => (
  <Outer>
    {children}
  </Outer>
)

export default ActionGroup