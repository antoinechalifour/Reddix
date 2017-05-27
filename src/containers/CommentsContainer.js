import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Comments from '../components/post/Comments'
import {
  postRootCommentSelectorFactory,
  mapIdsToComments
 } from '../selectors/comments'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const commentIds = postRootCommentSelectorFactory(id)(state)

  return { commentIds }
}

export default connect(mapStateToProps)(Comments)