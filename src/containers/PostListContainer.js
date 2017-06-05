import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/post'
import PostList from '../components/PostList'
import {
  categorySubredditSelectorFactory,
  mapIdsToPosts
} from '../selectors/posts'
import { createSelector } from 'reselect'

const mapStateToProps = (state, ownProps) => {
  const { r, from } = ownProps
  const posts = createSelector(
    categorySubredditSelectorFactory(from, r),
    mapIdsToPosts(state)
  )(state)

  return { posts }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
