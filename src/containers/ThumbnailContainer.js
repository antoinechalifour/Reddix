import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/post'
import * as uiActions from '../actions/ui'
import Thumbnail from '../components/widgets/Thumbnail'

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  }
})

export default connect(null, mapDispatchToProps)(Thumbnail)