import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Drawer from '../components/layout/Drawer'
import * as AuthActions from '../actions/auth'
import {
  subscriptionsSelector,
  mapIdsToSubreddits
} from '../selectors'
import { createSelector } from 'reselect'

const mapStateToProps = state => {
  const subreddits = createSelector(
    subscriptionsSelector,
    mapIdsToSubreddits(state)
  )(state)
  const ids = state.subscriptions
  const me = state.me

  return { subreddits, me }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)