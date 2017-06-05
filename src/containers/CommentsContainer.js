import { connect } from 'react-redux'
import Comments from '../components/Comments'
import { postRootCommentSelectorFactory } from '../selectors/comments'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const commentIds = postRootCommentSelectorFactory(id)(state)

  return { commentIds }
}

export default connect(mapStateToProps)(Comments)
