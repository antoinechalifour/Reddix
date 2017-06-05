import styled from 'styled-components'

export default styled.input`
  border: none;
  box-sizing: border-box;
  display: block;
  background: transparent;
  font-size: inherit;
  outline: none;
  width: 100%;
  padding: 16px 8px;

  border-bottom: 1px solid #bcbcbc;
  transition: border-bottom .2s ease-in;

  &:focus {
    border-bottom: 1px solid #56571c;
  }
`
