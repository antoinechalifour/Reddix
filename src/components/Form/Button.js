import styled from 'styled-components'
import { BOX_SHADOW_1 } from 'Util/constants'

export default styled.button`
  font-size: inherit;
  background: none;
  text-transform: uppercase;
  border: none;
  outline: none;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: ${BOX_SHADOW_1};
  cursor: pointer;

  ${({ primary, theme }) => primary && `
    color: #fff;
    background: ${theme.colors.primary};
  `}
`
