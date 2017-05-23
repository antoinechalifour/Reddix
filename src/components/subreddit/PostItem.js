import React from 'react'
import Humanize from 'humanize-plus'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostItem = ({
  id,
  score,
  author,
  title,
  subreddit,
  thumbnail,
  created_utc,
  domain
}) => (
  <div className='post-item'>
    <div className='post-item__header'>
      <div className='post-item__score'>
        {Humanize.compactInteger(score, 1)}
      </div>
      <div className='post-item__meta'>
        <Link to={`/u/${author.name}`}>{author.name}</Link> in <Link to={`/r/${subreddit.display_name}`}>{subreddit.display_name}</Link>
      </div>
    </div>
    <div className='post-item__content'>
      <div className='post-item__title'>
        <Link to={`/r/${subreddit.display_name}/comments/${id}`}>{title}</Link>
      </div>
    </div>
    <div className='post-item__footer'>
      <div className='post-item__source'>{domain}</div>
      <div className='post-item__created'>{moment(created_utc * 1000).fromNow()}</div>
    </div>
  </div>
)

export default PostItem