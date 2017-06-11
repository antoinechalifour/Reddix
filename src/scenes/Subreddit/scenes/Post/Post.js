import React, { Component } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import Humanize from 'humanize-plus'
import moment from 'moment'
import { Route, Link } from 'react-router-dom'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdFav from 'react-icons/lib/md/favorite'
import AppBar from 'Components/AppBar'
import { Card, CardContent } from 'Components/Card'
import Thumbnail from 'Components/Thumbnail'
import FluidIframe from 'Components/FluidIframe'
import OverlayModal from 'Components/OverlayModal'
import {
  upvotableHOC,
  downvotableHOC,
  savableHOC,
  ThingActions,
  ActionGroup,
  Action
} from 'Components/ThingActions'
import Placeholder from './components/Placeholder'
import Comments from './components/Comments'
import CommentEditor from './components/CommentEditor'

const Container = styled.div`
  max-width: ${props => props.theme.dimens.breakpoint};
  box-sizing: border-box;
  margin: 24px auto;
`

const StickyAppBar = styled(AppBar)`
  position: sticky;
  top: 0px;
`

const PostHeader = styled.div`
  display: flex;
  flex-direction: row;

  > :first-child {
    margin-right: 12px;
  }

  > :nth-child(2) {
    flex: 1;
  }
`

const PostBody = styled.div`
  margin-top: 12px;
`

const PostImage = styled.div`
  margin-left: -16px;
  margin-right: -16px;

  img {
    display: block;
    width: 100%;
  }
`

const PostVideo = styled.div`
  margin-left: -16px;
  margin-right: -16px;

  iframe {
    display: block;
  }
`

const EditorLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.textLight};
  margin: 16px;
`

const UpvoteButton = upvotableHOC(Action)
const DownvoteButton = downvotableHOC(Action)
const SaveButton = savableHOC(Action)

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

        <Container>
          <Card>
            <CardContent>
              {this.props.author
                ? (
                  <div>
                    <PostHeader>
                      <Thumbnail {...this.props} />
                      <div>
                        {this.props.title}
                      </div>
                    </PostHeader>
                    <PostBody>
                      {this.props.selftext && (
                        <Markdown source={this.props.selftext} />
                      )}

                      {this.props.post_hint === 'image' && (
                        <PostImage>
                          <img src={this.props.url} />
                        </PostImage>
                      )}

                      {this.props.post_hint === 'rich:video' && (
                        <PostVideo>
                          <FluidIframe {...this.props.media_embed} />
                        </PostVideo>
                      )}

                      <ThingActions>
                        <ActionGroup>
                          <Action>{Humanize.compactInteger(this.props.score)}</Action>
                        </ActionGroup>

                        <ActionGroup>
                          <UpvoteButton id={this.props.name}>
                            <MdArrowUpward />
                          </UpvoteButton>

                          <SaveButton id={this.props.name}>
                            <MdFav />
                          </SaveButton>

                          <DownvoteButton id={this.props.name}>
                            <MdArrowDownward />
                          </DownvoteButton>
                        </ActionGroup>

                        <ActionGroup>
                          <Action>
                            <Link to={`/u/${this.props.author}`}>/u/{this.props.author}</Link>
                          </Action>
                        </ActionGroup>

                        <ActionGroup>
                          <Action>{moment(this.props.created_utc * 1000).fromNow()}</Action>
                        </ActionGroup>

                        <ActionGroup>
                          <Action>
                            {this.props.is_self ? (
                              <Link to={`/r/${this.props.subreddit}`}>
                                {this.props.domain}
                              </Link>
                            ) : (
                              <a href={this.props.url} target='_blank'>{this.props.domain}</a>
                            )}
                          </Action>
                        </ActionGroup>
                      </ThingActions>
                    </PostBody>
                  </div>
                ) : (
                  <Placeholder />
                )
              }
            </CardContent>
          </Card>

          {this.props.name && (
            <div>
              <EditorLink to={`/r/${this.props.subreddit}/comments/${this.props.id}/submit/${this.props.name}`}>
                Write something...
              </EditorLink>
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
            </div>
          )}

          <Comments id={this.props.id} />
        </Container>
      </div>
    )
  }
}

export default Post
