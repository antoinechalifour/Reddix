import React, { Component } from 'react'
import MdBookmark from 'react-icons/lib/md/bookmark'
import MdBookmarkOutline from 'react-icons/lib/md/bookmark-outline'
import MdRefresh from 'react-icons/lib/md/refresh'
import PostListContainer from '../../containers/PostListContainer'
import Tabs, { Tab } from '../widgets/Tabs'

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
      <div className='subreddit'>
        <div className="subreddit__header">
          <h1>{this.props.subreddit.title}</h1>
          <div className="subreddit__information">
            <div><span>{this.props.subreddit.subscribers}</span> subscribers</div>
            <div><span>{this.props.subreddit.active_user_count}</span> reading now</div>
          </div>
          <div className='subreddit__actions'>
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
          </div>
        </div>
        <Tabs>
          <Tab title='Hot'>
            <div className='subreddit__post-list'>
              <PostListContainer
                r={this.props.r}
                from={'hot'}
              />
            </div>
          </Tab>
          <Tab title='New'>
            <div className='subreddit__post-list'>
              <PostListContainer
                r={this.props.r}
                from={'new'}
              />
            </div>
          </Tab>
          <Tab title='Rising'>
            <div className='subreddit__post-list'>
              <PostListContainer
                r={this.props.r}
                from={'rising'}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Subreddit