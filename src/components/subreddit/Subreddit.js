import React, { Component } from 'react'
import PostListContainer from '../../containers/PostListContainer'
import Tabs, { Tab } from '../widgets/Tabs'

class Subreddit extends Component {
  constructor (props) {
    super(props)
  }

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
          <div
            className='subreddit__cover'
            style={{
              backgroundImage: `url(${this.props.subreddit.header_img})`
            }}
          />
          <h1>{this.props.subreddit.title}</h1>
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