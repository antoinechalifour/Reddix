import styled from 'styled-components'

const Action = styled.div`
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.colors.accent : theme.colors.textLight};
  transition: color .2s ease-in;

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    outline: none;
    color: inherit;
    cursor: inherit;
  }
`

export default Action
