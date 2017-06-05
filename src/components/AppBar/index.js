import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from './AppBar'
import * as UiActions from 'Actions/ui'

const mapStateToProps = state => ({ api: state.r })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UiActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
