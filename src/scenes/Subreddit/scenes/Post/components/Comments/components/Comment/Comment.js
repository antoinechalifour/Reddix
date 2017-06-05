import React, { Component } from 'react'
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

const StyledIconHOC = WrappedIcon => styled(WrappedIcon)`
  cursor: pointer;
  margin-top: 8px;

  ${({ active }) => active && `color: ${PRIMARY_COLOR}`}
`

class Comment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showChildren: true
    }
  }

  render () {
    return (
      <Outer>
        <Main>
          <Actions>
            {React.createElement(StyledIconHOC(MdArrowUpward), {
              active: this.props.likes === 1,
              onClick: () => this.props.actions.toggleUpvote(this.props.id)
            })}

            {React.createElement(StyledIconHOC(MdStar), {
              active: this.props.saved,
              onClick: () => this.props.actions.toggleSave(this.props.id)
            })}

            {React.createElement(StyledIconHOC(MdArrowDownward), {
              active: this.props.likes === -1,
              onClick: () => this.props.actions.toggleDownvote(this.props.id)
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

            <div
              onClick={() => this.setState(ls => ({
                ...ls,
                showChildren: !ls.showChildren
              }))}
            >
              <Markdown source={this.props.body} />
            </div>
          </Body>
        </Main>

        {this.state.showChildren && this.props.replies.length > 0 && (
          <Replies>
            {this.props.replies.map(id => (
              <CommentContainer
                key={id}
                id={id}
              />
            ))}
          </Replies>
        )}
      </Outer>
    )
  }
}

export default Comment
