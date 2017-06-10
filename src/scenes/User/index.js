import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'Actions/users'
import User from './User'

const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps.match.params
  const userInformation = state.users[username]

  return {
    username,
    ...userInformation
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
