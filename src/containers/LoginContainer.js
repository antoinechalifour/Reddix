import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../components/LoginPage'
import * as AuthActions from '../actions/auth'

const mapStateToProps = state => state.login.api

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
