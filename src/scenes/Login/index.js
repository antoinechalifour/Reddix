import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AuthActions from 'Actions/auth'
import Login from './Login'

const mapStateToProps = state => state.login.api

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
