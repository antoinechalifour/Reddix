import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import MdBookmark from 'react-icons/lib/md/bookmark'
import MdBookmarkOutline from 'react-icons/lib/md/bookmark-outline'
import MdRefresh from 'react-icons/lib/md/refresh'
import MdEdit from 'react-icons/lib/md/edit'
import PostListContainer from '../../containers/PostListContainer'
import {
  Tabs,
  Tab,
  TabList,
  TabPanels
} from '../widgets/Tabs'
import {
  FONT_COLOR,
  RESPONSIVE_BREAKPOINT
} from '../../util/constants'

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

const Fab = styled(Link)`
  position: fixed;
  bottom: 24px;
  right: 24px;
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
          <TabList>
            <Tab>Hot</Tab>
            <Tab>New</Tab>
            <Tab>Risigin</Tab>
          </TabList>
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

        <Fab
          className='fab'
          to={`/r/${this.props.r}/submit`}
        >
          <MdEdit />
        </Fab>
      </div>
    )
  }
}

export default Subreddit
