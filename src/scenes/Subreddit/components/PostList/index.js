import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as actions from 'Actions/post'
import {
  categorySubredditSelectorFactory,
  mapIdsToPosts
} from 'Selectors/posts'
import PostList from './PostList'

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
