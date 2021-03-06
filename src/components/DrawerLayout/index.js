import { connect } from 'react-redux'
import DrawerLayout from './DrawerLayout'

const mapStateToProps = state => ({
  isDrawerOpen: state.ui.drawer === 'open'
})

export default connect(mapStateToProps, null, null, { pure: false })(DrawerLayout)
