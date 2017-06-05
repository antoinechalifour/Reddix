import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  commentChildrenSelectorFactory,
  commentSelectorFactory,
  commentMoreSelectorFactory
} from 'Selectors/comments'
import * as actions from 'Actions/comments'
import Comment from './Comment'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const comment = commentSelectorFactory(id)(state)
  const replies = commentChildrenSelectorFactory(id)(state)
  const more = commentMoreSelectorFactory(id)(state)

  return {
    ...comment,
    replies,
    more: more && more.length
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
