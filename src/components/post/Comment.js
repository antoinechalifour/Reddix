import React from 'react'
import Markdown from 'react-markdown'
import Humanize from 'humanize-plus'

const Comment = props => {
  return (
    <div className='comment'>
      <div className="comment__header">
        <div className="comment__score">{Humanize.compactInteger(props.score, 1)}</div>
        <div className="comment__author">/u/{props.author}</div>
      </div>

      <div className="comment__body">
        <Markdown source={props.body} />
      </div>

      <div className="comment__replies">
        {props.replies.map(r => (
          <Comment
            key={`${props.id}__${r.id}`}
            {...r}
          />
        ))}
      </div>
    </div>
  )
}

export default Comment