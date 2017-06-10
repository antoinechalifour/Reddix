import styled from 'styled-components'

export default styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .8);

  z-index: ${({ zIndex }) => zIndex || 1000};

  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    width: 95%;
    max-width: 800px;
    box-sizing: border-box;
  }
`
