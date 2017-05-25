import { connect } from 'react-redux'
import {
  createCommentChildrenSelector,
  createCommentSelector
} from '../selectors'
import Comment from '../components/post/Comment'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const comment = createCommentSelector(id)(state)
  const replies = createCommentChildrenSelector(id)(state)

  return {
    ...comment,
    replies
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)