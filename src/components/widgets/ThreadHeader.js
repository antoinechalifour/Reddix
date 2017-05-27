import React from 'react'
import { Link } from 'react-router-dom'
import ThumbnailContainer from '../../containers/ThumbnailContainer'

const ThreadHeader = props => {
  return (
    <div className='thread-header'>
      <ThumbnailContainer {...props} />
      
      <Link
        to={`/r/${props.subreddit}/comments/${props.id}`}
      >
        {props.title}
      </Link>
    </div>
  )
}

export default ThreadHeader