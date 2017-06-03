import { connect } from 'react-redux'
import DrawerLayout from '../components/layout/DrawerLayout'

const mapStateToProps = state => ({
  isDrawerOpen: state.ui.drawer === 'open',
  side: state.ui.side
})

export default connect(mapStateToProps, null, null, { pure: false })(DrawerLayout)
