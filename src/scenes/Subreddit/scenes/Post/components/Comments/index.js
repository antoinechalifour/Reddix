import { connect } from 'react-redux'
import Comments from './Comments'
import { postRootCommentSelectorFactory } from 'Selectors/comments'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const commentIds = postRootCommentSelectorFactory(id)(state)

  return { commentIds }
}

export default connect(mapStateToProps)(Comments)
