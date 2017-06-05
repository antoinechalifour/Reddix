import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import ThreadHeader from '../widgets/ThreadHeader'
import ThreadInformation from '../widgets/ThreadInformation'
import ThreadScore from '../widgets/ThreadScore'
import {
  PRIMARY_COLOR,
  BOX_SHADOW_1
} from '../../util/constants'

const Outer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 4px;

  background: #fff;
  box-shadow: ${BOX_SHADOW_1};

  + & {
    margin-top: 8px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-right: 1px solid #d1d2d3;
  padding: 12px;
  font-soze: 20px;
`

const StyledIconHOC = WrappedComponent => styled(WrappedComponent)`
  cursor: pointer;
  color: #bcbcbc;

  + * {
    margin-top: 16px;
  }

  ${({ active }) => {
    if (active) {
      return `color: ${PRIMARY_COLOR}`
    }
  }}
`

const Main = styled.div`
display: flex;
flex-direction: column;
padding: 12px;
flex: 1;
`

const PostItem = props => (
  <Outer>
    <Actions>
      {React.createElement(StyledIconHOC(MdArrowUpward), {
        active: props.likes === 1,
        onClick: () => props.actions.toggleUpvote(props.id)
      })}

      {React.createElement(StyledIconHOC(MdStar), {
        active: props.saved,
        onClick: () => props.actions.toggleSave(props.id)
      })}

      {React.createElement(StyledIconHOC(MdArrowDownward), {
        active: props.likes === -1,
        onClick: () => props.actions.toggleDownvote(props.id)
      })}
    </Actions>

    <Main>
      <ThreadInformation>
        <div>
          <ThreadScore>{props.score}</ThreadScore>
        </div>
        <div>
          <Link to={`/u/${props.author}`}>{props.author}</Link> in <Link to={`/r/${props.subreddit}`}>{props.subreddit}</Link>
        </div>
      </ThreadInformation>

      <ThreadHeader {...props} />

      <ThreadInformation>
        <div>{props.num_comments} comments</div>
        <div>{props.domain}</div>
        <div>{moment(props.created_utc * 1000).fromNow()}</div>
      </ThreadInformation>
    </Main>
  </Outer>
)

export default PostItem
