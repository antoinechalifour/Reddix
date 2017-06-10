import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Post from './Post'
import * as PostActions from 'Actions/post'

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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Post)
