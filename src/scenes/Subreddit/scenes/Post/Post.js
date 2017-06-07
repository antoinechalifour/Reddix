import React, { Component } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MdArrowUpward from 'react-icons/lib/md/arrow-upward'
import MdArrowDownward from 'react-icons/lib/md/arrow-downward'
import MdStar from 'react-icons/lib/md/star'
import MdReply from 'react-icons/lib/md/reply'
import AppBar from 'Components/AppBar'
import FluidIframe from 'Components/FluidIframe'
import {
  RESPONSIVE_BREAKPOINT,
  BOX_SHADOW_1,
  BOX_SHADOW_2
} from 'Util/constants'
import Placeholder from './components/Placeholder'
import ThreadHeader from '../../components/ThreadHeader'
import ThreadInformation from '../../components/ThreadInformation'
import ThreadScore from '../../components/ThreadScore'
import Comments from './components/Comments'

const Content = styled.div`
  max-width: ${RESPONSIVE_BREAKPOINT};
  box-sizing: border-box;
  margin: 24px auto;
  padding: 16px;
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

const ThreadActions = styled(ThreadInformation)`
  display: flex;
  font-size: 24px;

  > * {
    flex: 1;
  }
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
        <StickyAppBar r={this.props.r} />

        <Content>
          {this.props.author
            ? (
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

                <ThreadActions>
                  <MdArrowUpward />
                  <MdStar />
                  <MdArrowDownward />
                  <MdReply />
                </ThreadActions>
              </div>
            ) : (
              <Placeholder />
            )
          }
        </Content>

        <Comments id={this.props.id} />
      </div>
    )
  }
}

export default Post
