import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import moment from 'moment'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdFavorite from 'react-icons/lib/md/favorite'
import MdReply from 'react-icons/lib/md/reply'
import {
  upvotableHOC,
  downvotableHOC,
  savableHOC,
  ThingActions,
  ActionGroup,
  Action
} from 'Components/ThingActions'
import CommentContainer from './index'

const generateColor = seed => {
  let color = Math.floor((Math.abs(Math.sin(seed) * 16777215)) % 16777215)
  color = color.toString(16)

  while (color.length < 6) {
    color = `0${color}`
  }

  return `#${color}`
}

const Divider = styled.div`
  height: 1px;
  margin-top: 16px;
  margin-bottom: 16px;
  background: ${props => props.theme.colors.light};
`

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

const Body = styled.div`
  padding-left: ${({ isReply }) => isReply ? '16px' : 0};
`

const MoreComments = styled.div`
  font-style: italic;
  font-size: ${props => props.theme.font.size * 0.8}px;
  margin: 12px;
  cursor: pointer;
`

const UpvoteButton = upvotableHOC(Action)
const DownvoteButton = downvotableHOC(Action)
const SaveButton = savableHOC(Action)

class Comment extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      showChildren: true
    }

    this.requestMore = () => this.props.actions.requestMoreComments(this.props.id)
  }

  render () {
    const { link_id: linkId } = this.props
    const postId = linkId.substr(3)
    const baseOffset = 8
    const leftOffset = baseOffset * this.props.depth
    let repliesIndicatorColor = 'transparent'

    if (this.props.depth > 0) {
      repliesIndicatorColor = generateColor(this.props.depth)
    }

    const isReply = this.props.depth > 0

    return (
      <div style={{ paddingLeft: `${baseOffset}px` }}>
        {isReply && (<Divider style={{ marginLeft: `-${leftOffset}px` }} />)}

        <Body
          style={{ borderLeft: `4px solid ${repliesIndicatorColor}` }}
          isReply={isReply}
        >
          <Header>
            <Link to={`/u/${this.props.author}`}>
              {this.props.author}
            </Link> wrote <span>{moment(this.props.created_utc * 1000).fromNow()}</span>
          </Header>
          <Markdown
            source={this.props.body}
          />

          <ThingActions>
            <ActionGroup>
              <UpvoteButton id={this.props.name}>
                <MdArrowUpward />
              </UpvoteButton>

              <SaveButton id={this.props.name}>
                <MdFavorite />
              </SaveButton>

              <DownvoteButton id={this.props.name}>
                <MdArrowDownward />
              </DownvoteButton>
            </ActionGroup>

            <ActionGroup>
              <Action>
                <Link to={`/r/${this.props.subreddit}/comments/${postId}/submit/${this.props.name}`}>
                  <MdReply />
                </Link>
              </Action>
            </ActionGroup>

            {this.props.replies.length > 0 && (
              <ActionGroup>
                <Action>
                  <button onClick={() => this.setState({ showChildren: !this.state.showChildren })}>
                    {this.state.showChildren ? 'Less' : 'More'}
                  </button>
                </Action>
              </ActionGroup>
            )}
          </ThingActions>
        </Body>

        {this.state.showChildren && (this.props.replies.length > 0 || this.props.more > 0) && (
          <div>
            {this.props.replies.map(id => (
              <CommentContainer
                key={id}
                id={id}
                depth={this.props.depth + 1}
              />
            ))}
            {this.props.more && (
              <MoreComments
                style={{ paddingLeft: `${baseOffset}px` }}
                onClick={this.requestMore}
              >
                Load {this.props.more} more comments
              </MoreComments>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Comment
