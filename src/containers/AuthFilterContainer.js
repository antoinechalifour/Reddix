import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isLoggedIn: state.auth
})

const AuthFilterContainer = ({ isLoggedIn, lIn = null, lOut = null }) => {
  if (isLoggedIn) {
    return lIn
  }

  return lOut
}

export default connect(mapStateToProps)(AuthFilterContainer)