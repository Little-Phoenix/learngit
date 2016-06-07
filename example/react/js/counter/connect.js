import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from './counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

export default connect(mapStateToProps)(Counter)
