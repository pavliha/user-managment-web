import { all, fork } from 'redux-saga/effects'
import auth from './auth/saga'
import users from './users/saga'

export default function* rootSaga() {
  yield all([
    fork(auth),
    fork(users)
  ])
}
