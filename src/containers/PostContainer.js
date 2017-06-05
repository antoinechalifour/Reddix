import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Post from '../components/Post'
import * as PostActions from '../actions/post'

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.byId[ownProps.id] || {}

  return {
    ...post,
    id: ownProps.id
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PostActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
