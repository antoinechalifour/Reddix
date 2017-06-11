import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#2980B9',
    primaryDark: '#1E2F39',
    accent: '#C5403F',
    text: '#131516',
    textLight: '#8C979A',
    light: '#d1d2d3'
  },
  fonts: {},
  dimens: {
    breakpoint: '800px'
  }
}

export default function Theme ({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
