import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Subreddit from '../components/subreddit/Subreddit'
import * as SubredditActions from '../actions/subreddit'

const mapStateToProps = (state, ownProps) => {
  const { r = 'all' } = ownProps
  const postIds = state.subreddits.posts[r] || []
  const posts = postIds.map(id => state.posts.byId[id])

  return { posts }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(SubredditActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Subreddit)