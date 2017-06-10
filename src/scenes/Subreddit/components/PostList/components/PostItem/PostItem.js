import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import { BOX_SHADOW_1 } from 'Util/constants'
import ActionGroup from '../../../ActionGroup'
import ActionIcon from '../../../ActionIcon'
import ThreadHeader from '../../../ThreadHeader'
import ThreadInformation from '../../../ThreadInformation'
import ThreadScore from '../../../ThreadScore'

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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  flex: 1;
`

const PostItem = props => (
  <Outer>
    <ActionGroup>
      <ActionIcon
        active={props.likes === 1}
        onClick={() => props.actions.toggleUpvote(props.id)}
      >
        <MdArrowUpward />
      </ActionIcon>
      <ActionIcon
        active={props.saved}
        onClick={() => props.actions.toggleSave(props.id)}
      >
        <MdStar />
      </ActionIcon>
      <ActionIcon
        active={props.likes === -1}
        onClick={() => props.actions.toggleDownvote(props.id)}
      >
        <MdArrowDownward />
      </ActionIcon>
    </ActionGroup>

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
