import { connect } from 'react-redux'
import FakeProgressLoader from '../components/widgets/FakeProgressLoader'

const mapStateToProps = state => {
  const loaderPaths = ['posts', 'subreddits']
  const isLoading = loaderPaths.some(path => state[path].api.isLoading)

  return { show: isLoading }
}

export default connect(mapStateToProps)(FakeProgressLoader)