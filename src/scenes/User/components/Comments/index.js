import React from 'react'

const Comments = props => {
  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  )
}

export default Comments
