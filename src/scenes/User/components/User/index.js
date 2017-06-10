import React from 'react'

const User = (props) => {
  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  )
}

export default User
