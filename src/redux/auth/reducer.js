import { fromJWT } from 'src/utils'
import Storage from 'src/services/Storage'

import {
  LOGIN_USER_FULFILLED,
  REGISTER_USER_FULFILLED,
  SET_AUTH_USER,
  SET_AUTH_EMAIL,
  ACTIVATE_USER_FULFILLED,
  LOGIN_GOOGLE_USER_FULFILLED,
  LOGIN_FACEBOOK_USER_FULFILLED, LOGOUT_USER_FULFILLED,
} from './action'

const token = Storage.get('token')

const user_id = fromJWT(token)?.id

const initialState = {
  user_id,
  token,
  isLoading: false,
  email: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOGIN_GOOGLE_USER_FULFILLED:
    case LOGIN_FACEBOOK_USER_FULFILLED:
    case ACTIVATE_USER_FULFILLED:
    case REGISTER_USER_FULFILLED:
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        token: payload.token,
        user_id: fromJWT(payload.token)?.id,
      }

    case LOGOUT_USER_FULFILLED: {
      Storage.clear()
      return {
        ...state,
        token: null,
        user_id: null,
      }
    }

    case SET_AUTH_USER:
      return {
        ...state,
        user_id: payload.id,
      }

    case SET_AUTH_EMAIL:
      return {
        ...state,
        email: payload,
      }

    default:
      return state
  }
}

export default authReducer
