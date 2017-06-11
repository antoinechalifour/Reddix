import React, { Component } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
// import MdReply from 'react-icons/lib/md/reply'
import AppBar from 'Components/AppBar'
import FluidIframe from 'Components/FluidIframe'
import OverlayModal from 'Components/OverlayModal'
import {
  upvotableHOC,
  downvotableHOC,
  savableHOC
} from 'Components/ThingActions'
import {
  RESPONSIVE_BREAKPOINT,
  BOX_SHADOW_2
} from 'Util/constants'
import Placeholder from './components/Placeholder'
import ThreadHeader from '../../components/ThreadHeader'
import ThreadInformation from '../../components/ThreadInformation'
import ActionGroup from '../../components/ActionGroup'
import ActionIcon from '../../components/ActionIcon'
import ThreadScore from '../../components/ThreadScore'
import Comments from './components/Comments'
import CommentEditor from './components/CommentEditor'

const Content = styled.div`
  max-width: ${RESPONSIVE_BREAKPOINT};
  box-sizing: border-box;
  margin: 24px auto;
  border-radius: 4px;
  overflow: hidden;

  background: #fff;
  box-shadow: ${BOX_SHADOW_2};
`

const SelfText = styled.div`
  font-size: 14px;
`

const RichMedia = styled.div`
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: -16px;

  iframe {
    display: block;
  }
`

const StickyAppBar = styled(AppBar)`
  position: sticky;
  top: 0px;
`

const PostLayout = styled.div`
  display: flex;
  flex-direction: row;

  > div:nth-child(2) {
    padding: 16px;
    flex: 1;
  }
`

const UpvoteButton = upvotableHOC(ActionIcon)
const DownvoteButton = downvotableHOC(ActionIcon)
const SaveButton = savableHOC(ActionIcon)

class Post extends Component {
  componentDidMount () {
    this.props.actions.requestPost(
      this.props.r,
      this.props.id
    )
  }

  render () {
    return (
      <div>
        <StickyAppBar r={this.props.r} />

        <Content>
          {this.props.author
            ? (
              <PostLayout>
                <ActionGroup>
                  <UpvoteButton id={this.props.name}>
                    <MdArrowUpward />
                  </UpvoteButton>
                  <SaveButton id={this.props.name}>
                    <MdStar />
                  </SaveButton>
                  <DownvoteButton id={this.props.name}>
                    <MdArrowDownward />
                  </DownvoteButton>
                </ActionGroup>
                <div>
                  <ThreadInformation>
                    <div>
                      <ThreadScore>{this.props.score}</ThreadScore>
                    </div>
                    <div>
                      Posted by <Link to={`/u/${this.props.author}`}>{this.props.author}</Link>
                    </div>
                  </ThreadInformation>

                  <ThreadHeader {...this.props} />

                  {/* Only for selfs posts with texts */}
                  {this.props.selftext && (
                    <SelfText>
                      <Markdown source={this.props.selftext} />
                    </SelfText>
                  )}

                  {/* Only for Rich:Video content */}
                  {this.props.post_hint === 'rich:video' && (
                    <RichMedia>
                      <FluidIframe {...this.props.media_embed} />
                    </RichMedia>
                  )}

                  <Link to={`/r/${this.props.r}/comments/${this.props.id}/submit/${this.props.name}`}>Reply</Link>
                </div>
              </PostLayout>
            ) : (
              <Placeholder />
            )
          }
        </Content>

        {this.props.name && (
          <Route
            path='/r/:r/comments/:id/submit/:name'
            render={({ match }) => {
              const { name } = match.params

              return (
                <OverlayModal>
                  <CommentEditor id={name} />
                </OverlayModal>
              )
            }}
          />
        )}

        <Comments id={this.props.id} />
      </div>
    )
  }
}

export default Post
