import React from 'react'

const Overview = props => {
  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  )
}

export default Overview
