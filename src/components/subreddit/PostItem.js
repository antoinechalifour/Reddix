import React from 'react'
import Humanize from 'humanize-plus'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'

const ContentLink = props => (
  <div className='post-item__content--link'>
    <div
      className='post-item__content--image'
      style={{
        backgroundImage: `url(${props.thumbnail})`
      }}
    />
    <PostTitle {...props} />
  </div>
)

const ContentSelf = props => (
  <div className='post-item__content--self'>
    <PostTitle {...props} />
  </div>
)

const ContentImage = props => (
  <div className='post-item__content--image'>
    <div
      className='post-item__thumbnail'
      style={{
        backgroundImage: `url(${props.thumbnail})`
      }}
      onClick={() => props.actions.displayModal(props.id)}
    />
    <PostTitle {...props} />
  </div>
)

const ContentRichVideo = props => (
  <div className='post-item__content--video'>
    <div
      className='post-item__thumbnail'
      style={{
        backgroundImage: `url(${props.thumbnail})`
      }}
      onClick={() => props.actions.displayModal(props.id)}
    />
    <PostTitle {...props} />
  </div>
)

const ActionButtons = ({
  actions,
  id,
  saved,
  likes
}) => (
  <div className='post-item__actions'>
      <MdArrowUpward
      className={classnames({
        'post-item__actions--active': likes === 1
      })}
      onClick={() => actions.toggleUpvote(id)}
    />
    <MdStar
      className={classnames({
        'post-item__actions--active': saved
      })}
      onClick={() => actions.toggleSave(id)}
    />
    <MdArrowDownward
      className={classnames({
        'post-item__actions--active': likes === -1
      })}
      onClick={() => actions.toggleDownvote(id)}
    />
  </div>
)

const PostTitle = ({
  subreddit,
  id,
  title
}) => (
  <div className='post-item__title'>
    <Link to={`/r/${subreddit}/comments/${id}`}>
      {title}
    </Link>
  </div>
)

const PostLayout = ({
  score,
  author,
  subreddit,
  num_comments,
  domain,
  created_utc,
  children
}) => (
  <div className='post-item__main'>
    <div className='post-item__header'>
      <div className='post-item__score'>
        {Humanize.compactInteger(score, 1)}
      </div>
      <div className='post-item__meta'>
        <Link to={`/u/${author}`}>{author}</Link> in <Link to={`/r/${subreddit}`}>{subreddit}</Link>
      </div>
    </div>

    {children}

    <div className='post-item__footer'>
      <div className='post-item__comments'>{num_comments} comments</div>
      <div className='post-item__source'>{domain}</div>
      <div className='post-item__created'>{moment(created_utc * 1000).fromNow()}</div>
    </div>
  </div>
)

const PostItem = props => {
  const type = props.post_hint || 'self'

  return (
    <div className='post-item'>
      <ActionButtons {...props} />

      <PostLayout {...props}>
        {type === 'link' && (
          <ContentLink {...props} />
        )}

        {type === 'self' && (
          <ContentSelf {...props} />
        )}

        {type === 'image' && (
          <ContentImage {...props} />
        )}

        {type === 'rich:video' && (
          <ContentRichVideo {...props} />
        )}
      </PostLayout>
    </div>
  )
}

export default PostItem