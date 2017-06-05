import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { goBack } from 'react-router-redux'
import * as actions from 'Actions/post'
import PostEditor from './PostEditor'

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators({ goBack }, dispatch)
  }
})

export default connect(null, mapDispatchToProps)(PostEditor)
