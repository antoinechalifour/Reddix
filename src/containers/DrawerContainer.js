import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from '../components/layout/Drawer'
import * as AuthActions from '../actions/auth'

const mapStateToProps = state => {
  const subreddits = Object.keys(state.subreddits.byName)

  return { subreddits }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)