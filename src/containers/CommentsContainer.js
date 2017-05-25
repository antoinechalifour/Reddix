import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Comments from '../components/post/Comments'
import {
  createPostTopLevelCommentSelector,
  mapIdsToComments
 } from '../selectors'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const commentIds = createPostTopLevelCommentSelector(id)(state)

  return { commentIds }
}

export default connect(mapStateToProps)(Comments)