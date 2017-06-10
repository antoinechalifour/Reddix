import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CommentEditor from './CommentEditor'
import * as actions from 'Actions/comments'
import { goBack } from 'react-router-redux'

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators({ goBack }, dispatch)
  }
})

export default connect(null, mapDispatchToProps)(CommentEditor)
