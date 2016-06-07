import { INCREASE, REDUCE } from './action'
import { combineReducers } from 'redux'

function counter(state = 0, action) {
  switch (action.type) {
    case INCREASE:
      return state++;

    case REDUCE:
      return state--;

    default:
      return state;
  }
}

const rootReducer = combineReducers({counter})

export default rootReducer;
