import React from 'react'
import styled from 'styled-components'
import Humanize from 'humanize-plus'

const Score = styled.div`
  font-size: 18px;
`

const ThreadScore = ({ children }) => {
  const value = Humanize.compactInteger(children)

  return <Score>{value}</Score>
}

export default ThreadScore
