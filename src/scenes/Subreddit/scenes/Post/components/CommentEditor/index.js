import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentEditor from './CommentEditor'
import * as actions from 'Actions/comments'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(CommentEditor)
