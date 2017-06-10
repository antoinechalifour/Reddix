import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import * as AuthActions from 'Actions/auth'
import * as UiActions from 'Actions/ui'
import {
  subscriptionsSelector,
  mapIdsToSubreddits
} from 'Selectors/subreddits'
import Drawer from './Drawer'

const mapStateToProps = state => {
  const subreddits = createSelector(
    subscriptionsSelector,
    mapIdsToSubreddits(state)
  )(state)
  const me = state.me

  return { subreddits, me }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(AuthActions, dispatch),
    ...bindActionCreators(UiActions, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
