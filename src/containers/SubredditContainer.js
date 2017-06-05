import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Subreddit from '../components/Subreddit'
import * as SubredditActions from '../actions/subreddit'

const mapStateToProps = (state, ownProps) => {
  const sid = Object.keys(state.subreddits.byId).find(
    id => state.subreddits.byId[id].display_name === ownProps.r
  )
  const subscriptions = state.subscriptions
  const subreddit = state.subreddits.byId[sid]

  const isSubscribed = subreddit && subscriptions.indexOf(subreddit.id) !== -1

  return { subreddit, isSubscribed }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(SubredditActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Subreddit)
