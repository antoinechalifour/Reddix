import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/post'
import SubmitPost from '../components/subreddit/SubmitPost'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(SubmitPost)
