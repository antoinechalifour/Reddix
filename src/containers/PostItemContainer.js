import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/post'
import PostItem from '../components/subreddit/PostItem'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(PostItem)