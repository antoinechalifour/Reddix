import React from 'react'

const Posts = props => {
  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  )
}

export default Posts
