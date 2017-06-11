import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Humanize from 'humanize-plus'
import MdChatBubble from 'react-icons/lib/md/chat-bubble'
import ArrowUp from 'react-icons/lib/fa/caret-up'
import ArrowDown from 'react-icons/lib/fa/caret-down'
import { Card, CardContent } from 'Components/Card'
import {
  upvotableHOC,
  downvotableHOC
} from 'Components/ThingActions'
import Thumbnail from 'Components/Thumbnail'

const Content = styled(CardContent)`
  display: flex;
  flex-direction: row;

  > :first-child {
    margin-right: 12px;
  }

  > :nth-child(2) {
    flex: 1;
  }
`

const Title = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`

const Extra = styled.div`
  font-size: 14px;
  margin-top: 12px;
`

const ExtraRow = styled.div`
  color: #bcbcbc;
  font-size: 16px;
  display: flex;
  flex-direction: row;

  > * {
    display: inline-block;
    margin-right: 12px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  svg {
    font-size: 18px;
  }
`

const ActionButton = styled.span`
  ${({ active }) => active && 'color: red;'}
`

const UpvoteButton = upvotableHOC(ActionButton)
const DownvoteButton = downvotableHOC(ActionButton)

const PostItem = props => (
  <Card>
    <Content>
      <Thumbnail {...props} />
      <div>
        <Title>
          {props.is_self ? (
            <Link to={`/r/${props.subreddit}/comments/${props.id}`}>
              {props.title}
            </Link>
          ) : (
            <a href={props.url} target='_blank'>{props.title}</a>
          )}
        </Title>
        <Extra>
          <ExtraRow>
            <Link to={`/r/${props.subreddit}`}>{props.subreddit}</Link>
            <Link to={props.domain}>{props.domain}</Link>
          </ExtraRow>
          <ExtraRow>
            <span>
              <UpvoteButton id={props.name}>
                <ArrowUp />
              </UpvoteButton>
            </span>
            <span>{Humanize.compactInteger(props.score, 1)}</span>
            <span>
              <DownvoteButton id={props.name}>
                <ArrowDown />
              </DownvoteButton>
            </span>
            <Link to={`/r/${props.subreddit}/comments/${props.id}`}>
              <MdChatBubble /> {Humanize.compactInteger(props.num_comments)}
            </Link>
            <span>{moment(props.created_utc * 1000).fromNow()}</span>
          </ExtraRow>
        </Extra>
      </div>
    </Content>
  </Card>
)

export default PostItem
