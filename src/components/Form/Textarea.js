import styled from 'styled-components'

export default styled.textarea`
  box-sizing: border-box;
  border: none;
  display: block;
  background: transparent;
  resize: none;
  font-size: inherit;
  outline: none;
  width: 100%;
  padding: 16px 8px;

  border-bottom: 1px solid ${props => props.theme.colors.textLight};
  transition: border-bottom .2s ease-in;

  &:focus {
    border-bottom: 1px solid ${props => props.theme.colors.text};
  }
`
