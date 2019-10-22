import { combineReducers } from 'redux'
import entities from './entities'
import status from './status'

export default combineReducers({
  status,
  entities,
})
