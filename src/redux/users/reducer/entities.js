import { CREATE_TEMP_USER, SET_USER, SET_USERS } from '../action'
import { arrayToObject, fromJWT } from 'src/utils'
import Storage from 'src/services/Storage'
import moment from 'moment'
import uniqId from 'uniqid'

const user = fromJWT(Storage.get('token'))
const initialState = user ? { [user.id]: user } : {}

const formatUser = user => ({
  ...user,
  is_active: Boolean(user.is_active)
})

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_USER:
      return {
        ...state,
        [payload.id]: formatUser(payload),
      }

    case SET_USERS:
      return {
        ...state,
        ...arrayToObject(payload.map(formatUser)),
      }

    case CREATE_TEMP_USER: {

      const token = `temp-${uniqId()}`

      return {
        ...state,
        [token]: {
          id: token,
          name: 'New User',
          token: token,
          is_active: true,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }

    default:
      return state
  }
}

export default usersReducer
