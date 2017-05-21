import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  isLoggedIn: state.me
})

const noop = () => null
const AuthFilterContainer = ({ isLoggedIn, lIn = noop, lOut = noop }) => {
  if (isLoggedIn) {
    return lIn()
  }

  return lOut()
}

export default connect(mapStateToProps)(AuthFilterContainer)