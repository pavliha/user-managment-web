import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'
import {
  CREATE_USER_FULFILLED,
  LOAD_USERS_FULFILLED,
  UPDATE_USER_FULFILLED,
  DESTROY_USER_FULFILLED
} from 'src/redux/users/action'

const defineRelationsFrom = (models) => ([
  [models.users, actions.users.setMany],
])

function* setUsers({ payload: { data } }) {
  const models = normalize(data, 'users')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function* setUser({ payload }) {
  const models = normalize(payload, 'users')
  const relations = defineRelationsFrom(models)
  yield putRelationsToStore(models, relations)
}

function* removeUser({ mata: { user_id } }) {
  yield put(actions.users.remove(user_id))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_USERS_FULFILLED, setUsers),
    takeEvery(CREATE_USER_FULFILLED, setUser),
    takeEvery(UPDATE_USER_FULFILLED, setUser),
    takeEvery(DESTROY_USER_FULFILLED, removeUser)
  ])
}
