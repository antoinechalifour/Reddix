import styled from 'styled-components'
import { ACCENT_COLOR, BOX_SHADOW_1, BOX_SHADOW_2 } from 'Util/constants'

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;

  border-radius: 50%;
  background: ${ACCENT_COLOR};
  box-shadow: ${BOX_SHADOW_1};
  color: #fff;

  font-size: 24px;
  cursor: pointer;

  a {
    color: inherit;
  }

  &:hover {
    box-shadow: ${BOX_SHADOW_2};
  }
`
