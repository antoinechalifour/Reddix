import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'Actions/post'
import Thumbnail from './Thumbnail'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(null, mapDispatchToProps)(Thumbnail)
