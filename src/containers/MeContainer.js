import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/prefs'
import Me from '../components/me/Me'

const mapStateToProps = state => ({
  me: state.me,
  prefs: state.prefs.prefs
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Me)