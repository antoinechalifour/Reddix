import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/pages/Login'
import * as AuthActions from '../actions/auth'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Login)