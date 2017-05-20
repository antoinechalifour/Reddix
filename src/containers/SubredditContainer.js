import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Subreddit from '../components/subreddit/Subreddit'
import * as SubredditActions from '../actions/subreddit'

const mapStateToProps = (state, ownProps) => {
  const { r = 'all' } = ownProps
  const postIds = state.subreddits.posts[r] || []
  let posts = postIds.map(id => state.posts.byId[id])

  if (ownProps.from) {
    posts = posts.filter(x => x.__tag === ownProps.from)
  }

  return { posts }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(SubredditActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Subreddit)