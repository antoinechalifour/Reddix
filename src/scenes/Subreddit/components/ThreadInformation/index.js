import styled from 'styled-components'
import { FONT_COLOR_LIGHT } from 'Util/constants'

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-size: 14px;
  color: ${FONT_COLOR_LIGHT};

  > * {
    margin-right: 8px;
  }
`
