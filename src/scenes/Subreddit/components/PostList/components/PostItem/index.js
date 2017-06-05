import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'Actions/post'
import PostItem from './PostItem'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(PostItem)
