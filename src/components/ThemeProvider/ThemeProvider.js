import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#2980B9',
    primaryDark: '#1E2F39',
    accent: '#C5403F',
    text: '#131516',
    textLight: '#8C979A',
    light: '#d1d2d3'
  },
  font: {
    size: 18
  },
  dimens: {
    breakpoint: '800px'
  }
}

const Container = styled.div`
  font-size: ${props => `${props.theme.font.size}px`};
  color: ${props => props.theme.colors.text};
  background: #f7f7f9;
  line-height: 1.5;
  letter-spacing: 0.03rem;
  font-family: 'SourceSansPro', sans-serif;

  button, input, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  code {
    margin: 12px 0;
    display: block;
    font-family: monospace;
    padding: 8px;
    background: rgba(0, 0, 0, .08);
    border-left: 4px solid rgba(0, 0, 0, .1);
  }
`

export default function Theme ({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {children}
      </Container>
    </ThemeProvider>
  )
}
