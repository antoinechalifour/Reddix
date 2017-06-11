import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Humanize from 'humanize-plus'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdFav from 'react-icons/lib/md/favorite'
import MdChat from 'react-icons/lib/md/chat-bubble'
import { Card, CardContent } from 'Components/Card'
import {
  upvotableHOC,
  downvotableHOC,
  savableHOC,
  ThingActions,
  ActionGroup,
  Action
} from 'Components/ThingActions'
import Thumbnail from 'Components/Thumbnail'

const Header = styled.div`
  font-size: ${props => props.theme.font.size * 0.8}px;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 8px;

  span, a {
    font-weight: bold;
    color: ${props => props.theme.colors.text};
  }

  a {
    text-decoration: none;
  }
`

const Content = styled.div`
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

const UpvoteButton = upvotableHOC(Action)
const DownvoteButton = downvotableHOC(Action)
const SaveButton = savableHOC(Action)

const PostItem = props => (
  <Card>
    <CardContent>
      <Header>
        <Link to={`/u/${props.author}`}>
          {props.author}
        </Link> submitted <span>{moment(props.created_utc * 1000).fromNow()}</span>
      </Header>
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
        </div>
      </Content>

      <ThingActions>
        <ActionGroup>
          <Action>{Humanize.compactInteger(props.score)}</Action>
        </ActionGroup>

        <ActionGroup>
          <UpvoteButton id={props.name}>
            <MdArrowUpward />
          </UpvoteButton>

          <SaveButton id={props.name}>
            <MdFav />
          </SaveButton>

          <DownvoteButton id={props.name}>
            <MdArrowDownward />
          </DownvoteButton>
        </ActionGroup>

        <ActionGroup>
          <Action>
            <Link to={`/r/${props.subreddit}/comments/${props.id}`}>
              <MdChat /> {props.num_comments}
            </Link>
          </Action>
        </ActionGroup>

        <ActionGroup>
          <Action>
            {props.is_self ? (
              <Link to={`/r/${props.subreddit}`}>
                {props.domain}
              </Link>
            ) : (
              <a href={props.url} target='_blank'>{props.domain}</a>
            )}
          </Action>
        </ActionGroup>
      </ThingActions>
    </CardContent>
  </Card>
)

export default PostItem
