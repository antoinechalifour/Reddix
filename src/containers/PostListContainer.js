import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/post'
import PostList from '../components/subreddit/PostList'
import {
  createPostsCategorySubredditSelector,
  mapIdsToPosts
} from '../selectors'
import { createSelector } from 'reselect'
import unionArray from '../util/unionArray'

const mapStateToProps = (state, ownProps) => {
  const { r, from } = ownProps
  const posts = createSelector(
    createPostsCategorySubredditSelector(from, r),
    mapIdsToPosts(state)
  )(state)

  return { posts }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)