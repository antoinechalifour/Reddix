import { connect } from 'react-redux'

const ConditionalRender = ({ condition, children }) => {
  if (condition) {
    return children()
  }

  return null
}

export const IfLoggedIn = connect(state => ({ condition: state.me }))(ConditionalRender)
export const IfAnonymous = connect(state => ({ condition: !state.me }))(ConditionalRender)