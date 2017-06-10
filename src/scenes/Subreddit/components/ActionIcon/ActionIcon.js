import React from 'react'
import styled from 'styled-components'
import { PRIMARY_COLOR } from 'Util/constants'

const StyledIcon = styled.div`
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

const ActionIcon = (props) => (
  <StyledIcon {...props} />
)

export default ActionIcon
