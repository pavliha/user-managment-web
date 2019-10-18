import actions from 'src/redux/action'
import { all, put, takeEvery } from 'redux-saga/effects'
import { fromJWT } from 'src/utils'
import Storage from 'src/services/Storage'

import {
  LOGIN_USER_FULFILLED,
  REGISTER_USER_FULFILLED,
  LOGIN_GOOGLE_USER_FULFILLED,
  LOGIN_FACEBOOK_USER_FULFILLED,
  ACTIVATE_USER_FULFILLED
} from './action'

import {
  UPDATE_AUTH_USER_FULFILLED
} from 'src/redux/auth/user/action'

function* setAuthUser({ payload: { token } }) {
  const user = fromJWT(token)
  Storage.put({ token })
  yield put(actions.users.set(user))
}

export default function* saga() {
  yield all([
    takeEvery(LOGIN_USER_FULFILLED, setAuthUser),
    takeEvery(REGISTER_USER_FULFILLED, setAuthUser),
    takeEvery(LOGIN_USER_FULFILLED, setAuthUser),
    takeEvery(REGISTER_USER_FULFILLED, setAuthUser),
    takeEvery(LOGIN_GOOGLE_USER_FULFILLED, setAuthUser),
    takeEvery(LOGIN_FACEBOOK_USER_FULFILLED, setAuthUser),
    takeEvery(UPDATE_AUTH_USER_FULFILLED, setAuthUser),
    takeEvery(ACTIVATE_USER_FULFILLED, setAuthUser,),
  ])
}
