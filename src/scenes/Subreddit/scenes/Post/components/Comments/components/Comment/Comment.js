import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import { PRIMARY_COLOR } from 'Util/constants'
import CommentContainer from './index'
import ThreadInformation from '../../../../../../components/ThreadInformation'
import ThreadScore from '../../../../../../components/ThreadScore'

const Outer = styled.div`
  font-size: 14px;
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #d1d2d3;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  font-size: 16px;
  color: #bcbcbc;
`

const Body = styled.div`
`

const Replies = styled.div`
  padding-left: 16px;
`

const MoreComments = styled.div`
  margin-top: 16px;
  color: #bcbcbc;
  cursor: pointer;
`

const StyledIconHOC = WrappedIcon => styled(WrappedIcon)`
  cursor: pointer;
  margin-top: 8px;

  ${({ active }) => active && `color: ${PRIMARY_COLOR}`}
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
    return (
      <Outer>
        <Main>
          <Actions>
            {React.createElement(StyledIconHOC(MdArrowUpward), {
              active: this.props.likes === 1,
              onClick: this.upvote
            })}

            {React.createElement(StyledIconHOC(MdStar), {
              active: this.props.saved,
              onClick: this.save
            })}

            {React.createElement(StyledIconHOC(MdArrowDownward), {
              active: this.props.likes === -1,
              onClick: this.downvote
            })}
          </Actions>
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

        <Replies>
          {this.state.showChildren && this.props.replies.length > 0 && (
            <div>
              {this.props.replies.map(id => {
                return (
                  <CommentContainer
                    key={id}
                    id={id}
                  />
                )
              })}
            </div>
          )}

          {this.props.more > 0 && (
            <MoreComments onClick={this.requestMore}>
              Load {this.props.more} more comments...
            </MoreComments>
          )}
        </Replies>

      </Outer>
    )
  }
}

export default Comment
