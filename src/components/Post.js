import React, { Component } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppBarContainer from '../containers/AppBarContainer'
import ThreadHeader from './ThreadHeader'
import ThreadInformation from './ThreadInformation'
import ThreadScore from './ThreadScore'
import CommentsContainer from '../containers/CommentsContainer'
import FluidIframe from './FluidIframe'
import {
  RESPONSIVE_BREAKPOINT,
  BOX_SHADOW_1,
  BOX_SHADOW_2
} from '../util/constants'

const Content = styled.div`
  max-width: ${RESPONSIVE_BREAKPOINT};
  box-sizing: border-box;
  margin: 24px auto;
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;

  background: #fff;
  box-shadow: ${BOX_SHADOW_2};

  > div:nth-child(2) {
    margin-top: 8px;  
    margin-bottom: 8px;  
  }
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

const Comments = Content.extend`
  box-shadow: ${BOX_SHADOW_1};
`

const AppBar = styled(AppBarContainer)`
  position: sticky;
  top: 0px;
`

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
        <AppBar r={this.props.r} />

        <Content>
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
        </Content>

        <Comments>
          <CommentsContainer id={this.props.id} />
        </Comments>
      </div>
    )
  }
}

export default Post
