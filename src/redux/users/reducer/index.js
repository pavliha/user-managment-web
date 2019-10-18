import { combineReducers } from 'redux'
import entities from './entities'
import search from './search'

export default combineReducers({
  search,
  entities,
})
