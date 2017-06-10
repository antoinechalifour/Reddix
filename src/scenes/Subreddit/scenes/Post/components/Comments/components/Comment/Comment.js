import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import CommentContainer from './index'
import ActionGroup from '../../../../../../components/ActionGroup'
import ActionIcon from '../../../../../../components/ActionIcon'
import ThreadInformation from '../../../../../../components/ThreadInformation'
import ThreadScore from '../../../../../../components/ThreadScore'

const Outer = styled.div`
  font-size: 14px;
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Divider = styled.div`
  border-bottom: 1px solid #d1d2d3;
`

const Body = styled.div`
  padding: 16px;
  flex: 1;
`

const MoreComments = styled.div`
  margin: 16px 0;
  color: #bcbcbc;
  cursor: pointer;
`

class Comment extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      showChildren: true
    }

    this.upvote = () => this.props.actions.toggleUpvote(this.props.id)
    this.downvote = () => this.props.actions.toggleDownvote(this.props.id)
    this.save = () => this.props.actions.toggleSave(this.props.id)
    this.requestMore = () => this.props.actions.requestMoreComments(this.props.id)

    this.hideReplies = () => this.setState({ showChildren: false })
    this.showReplies = () => this.setState({ showChildren: true })
  }

  render () {
    const leftOffset = 4 * this.props.depth
    const repliesIndicatorOpacity = 1 - 1/(1 + this.props.depth / 8)
    const repliesIndicatorColor = `rgba(255, 0, 60, ${repliesIndicatorOpacity})`

    return (
      <Outer>
        <Divider
          style={{
            paddingLeft: `${leftOffset}px`
          }}
        >
          <Main
            style={{
              borderLeft: `4px solid ${repliesIndicatorColor}`
            }}
          >
            <div>
              <ActionGroup>
                <ActionIcon
                  active={this.props.likes === 1}
                  onClick={this.upvote}
                >
                  <MdArrowUpward />
                </ActionIcon>
                <ActionIcon
                  active={this.props.saved}
                  onClick={this.save}
                >
                  <MdStar />
                </ActionIcon>
                <ActionIcon
                  active={this.props.likes === -1}
                  onClick={this.downvote}
                >
                  <MdArrowDownward />
                </ActionIcon>
              </ActionGroup>
            </div>
            <Body>
              <ThreadInformation>
                <div>
                  <ThreadScore>{this.props.score}</ThreadScore>
                </div>
                <div>
                  Posted by <Link to={`/u/${this.props.author}`}>/u/{this.props.author}</Link>
                </div>
              </ThreadInformation>

              <Markdown source={this.props.body} />

              <ThreadInformation>
                {this.state.showChildren && (
                  <div onClick={this.hideReplies}>Hide replies</div>
                )}
                {!this.state.showChildren && (
                  <div onClick={this.showReplies}>Show replies</div>
                )}
              </ThreadInformation>
            </Body>
          </Main>
        </Divider>

        <div>
          {this.state.showChildren && this.props.replies.length > 0 && (
            <div>
              {this.props.replies.map(id => {
                return (
                  <CommentContainer
                    key={id}
                    id={id}
                    depth={this.props.depth + 1}
                  />
                )
              })}
            </div>
          )}

          {this.props.more > 0 && (
            <MoreComments
              style={{
                paddingLeft: `${leftOffset}px`
              }}
              onClick={this.requestMore}
            >
              Load {this.props.more} more comments...
            </MoreComments>
          )}
        </div>

      </Outer>
    )
  }
}

export default Comment
