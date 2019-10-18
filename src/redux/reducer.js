import { combineReducers } from 'src/redux/index'
import auth from './auth/reducer'
import users from './users/reducer'

export default combineReducers({
  auth,
  users,
})
