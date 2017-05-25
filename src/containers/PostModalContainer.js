import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/ui'
import PostModal from '../components/widgets/PostModal'

const mapStateToProps = state => {
  const show = state.ui.modal
    && state.ui.modal.kind === 'post'
  let post

  if (show) {
    post = state.posts.byId[state.ui.modal.id]
  }

  return { show, ...post }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)