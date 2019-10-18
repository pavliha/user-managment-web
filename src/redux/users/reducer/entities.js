import { DETACH_USER_FROM_ROOM, SET_USER, SET_USERS, SET_USERS_ONLINE } from '../action'
import { arrayToObject, fromJWT } from 'src/utils'
import Storage from 'src/services/Storage'
import omit from 'lodash/omit'

const user = fromJWT(Storage.get('token'))
const initialState = user ? { [user.id]: user } : {}

const formatUser = user => ({
  ...omit(user, 'pivot'),
  ...omit(user?.pivot, 'user_iod'),
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

    case DETACH_USER_FROM_ROOM:
      return {
        ...state,
        [payload.user_id]: {
          ...state[payload.user_id],
          room_id: null,
        },
      }

    case SET_USERS_ONLINE:
      return {
        ...state,
        ...arrayToObject(Object.values(state).map(user => ({
          ...formatUser(user),
          is_online: !!payload.find(id => user.id === id)
        })))
      }

    default:
      return state
  }
}

export default usersReducer
