import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import MdBookmark from 'react-icons/lib/md/bookmark'
import MdBookmarkOutline from 'react-icons/lib/md/bookmark-outline'
import MdRefresh from 'react-icons/lib/md/refresh'
import MdAdd from 'react-icons/lib/md/add'
import AppBar from 'Components/AppBar'
import { Tabs, Tab, TabList, TabPanels } from 'Components/Tabs'
import Fab from 'Components/Fab'
import { FONT_COLOR, RESPONSIVE_BREAKPOINT } from 'Util/constants'
import PostListContainer from './components/PostList'
import MediaViewer from './scenes/MediaViewer'
import PostEditor from './scenes/PostEditor'

const Header = styled.div`
  padding: 16px;
  background: #fff;

  h1 {
    text-transform: uppercase;
    font-size: 1.3rem;
  }
`

const Overview = styled.div`
  font-size: 0.85rem;
  color: #bcbcbc;

  div {
    display: inline-block;

    & + div {
      margin-left: 8px;

      &::before {
        content: '•';
        margin-right: 8px;
      }
    }
  }

  span {
    font-size: 1rem;
    color: ${FONT_COLOR};
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px;

  svg {
    color: #bcbcbc;
    font-size: 24px;
    cursor: pointer;
  }

  svg + svg {
    margin-left: 12px;
  }
`

const PostList = styled.div`
  margin-top: 8px;

  @media (min-width: ${RESPONSIVE_BREAKPOINT}) {
    width: 95%;
    max-width: ${RESPONSIVE_BREAKPOINT};
    margin-left: auto;
    margin-right: auto;
  }
`

const FixedFab = styled(Fab)`
  position: fixed;
  bottom: 24px;
  right: 24px;
`

const SickyAppBar = styled(AppBar)`
  position: sticky;
  top: 0px;
`

const StickyTabList = styled(TabList)`
  position: sticky;
  top: 61px;
`

class Subreddit extends Component {
  componentDidMount () {
    this.props.actions.requestSubreddit(this.props.r)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.r !== nextProps.r) {
      this.props.actions.requestSubreddit(nextProps.r)
    }
  }

  render () {
    if (!this.props.subreddit) {
      return null
    }
    return (
      <div>
        <SickyAppBar r={this.props.r} />

        <Header>
          <h1>{this.props.subreddit.title}</h1>

          <Overview>
            <div><span>{this.props.subreddit.subscribers}</span> subscribers</div>
            <div><span>{this.props.subreddit.active_user_count}</span> reading now</div>
          </Overview>

          <Actions>
            <MdRefresh
              onClick={() => this.props.actions.requestSubreddit(this.props.r)}
            />
            {this.props.isSubscribed && (
              <MdBookmark
                onClick={() => this.props.actions.toggleSubscription(this.props.subreddit.id)}
              />
            )}
            {!this.props.isSubscribed && (
              <MdBookmarkOutline
                onClick={() => this.props.actions.toggleSubscription(this.props.subreddit.id)}
              />
            )}
          </Actions>
        </Header>

        <Tabs>
          <StickyTabList>
            <Tab>Hot</Tab>
            <Tab>New</Tab>
            <Tab>Rising</Tab>
          </StickyTabList>
          <TabPanels>
            <PostList>
              <PostListContainer
                r={this.props.r}
                from={'hot'}
              />
            </PostList>
            <PostList>
              <PostListContainer
                r={this.props.r}
                from={'new'}
              />
            </PostList>
            <PostList>
              <PostListContainer
                r={this.props.r}
                from={'rising'}
              />
            </PostList>
          </TabPanels>
        </Tabs>

        <Route
          path='/r/:r/media/:pid'
          component={MediaViewer}
        />

        <Route
          path='/r/:r/submit'
          component={PostEditor}
        />

        <FixedFab>
          <Link to={`/r/${this.props.r}/submit`}>
            <MdAdd />
          </Link>
        </FixedFab>
      </div>
    )
  }
}

export default Subreddit
