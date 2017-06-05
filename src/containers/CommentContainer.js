import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  commentChildrenSelectorFactory,
  commentSelectorFactory
} from '../selectors/comments'
import * as actions from '../actions/comments'
import Comment from '../components/Comment'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const comment = commentSelectorFactory(id)(state)
  const replies = commentChildrenSelectorFactory(id)(state)

  return {
    ...comment,
    replies
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
