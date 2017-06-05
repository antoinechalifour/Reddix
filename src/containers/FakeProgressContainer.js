import { connect } from 'react-redux'
import FakeProgressLoader from '../components/FakeProgressLoader'

const mapStateToProps = state => {
  const loaderPaths = []
  const isLoading = loaderPaths.some(path => state[path].api.isLoading)

  return { show: isLoading }
}

export default connect(mapStateToProps)(FakeProgressLoader)
