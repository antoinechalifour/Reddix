import { connect } from 'react-redux'
import Comments from '../components/post/Comments'

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps
  const commentIds = state.comments.byPost[id] || []
  const comments = commentIds.map(id => state.comments.byId[id])

  return { comments }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)