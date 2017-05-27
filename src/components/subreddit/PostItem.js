import React from 'react'
import Humanize from 'humanize-plus'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import ThreadHeader from '../widgets/ThreadHeader'

const PostItem = props => (
  <div className='post-item'>
    <div className='post-item__actions'>
        <MdArrowUpward
        className={classnames({
          'post-item__actions--active': props.likes === 1
        })}
        onClick={() => props.actions.toggleUpvote(props.id)}
      />
      <MdStar
        className={classnames({
          'post-item__actions--active': props.saved
        })}
        onClick={() => props.actions.toggleSave(props.id)}
      />
      <MdArrowDownward
        className={classnames({
          'post-item__actions--active': props.likes === -1
        })}
        onClick={() => props.actions.toggleDownvote(props.id)}
      />
    </div>

    <div className='post-item__main'>
      <div className='thing-meta'>
        <div className='thing-meta__score'>{Humanize.compactInteger(props.score, 1)}</div>
        <div>
          <Link to={`/u/${props.author}`}>{props.author}</Link> in <Link to={`/r/${props.subreddit}`}>{props.subreddit}</Link>
        </div>
      </div>

      <ThreadHeader {...props} />

      <div className='thing-meta'>
        <div>{props.num_comments} comments</div>
        <div>{props.domain}</div>
        <div>{moment(props.created_utc * 1000).fromNow()}</div>
      </div>
    </div>
  </div>
)

export default PostItem