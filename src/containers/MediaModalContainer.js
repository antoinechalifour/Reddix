import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'react-router-redux'
import MediaModal from '../components/MediaModal'

const mapStateToProps = (state, ownprops) => {
  const { pid } = ownprops.match.params
  const post = state.posts.byId[pid] || {}

  return { ...post }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaModal)
