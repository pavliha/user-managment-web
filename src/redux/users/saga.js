import { all, takeEvery, put } from 'redux-saga/effects'
import actions from 'src/redux/action'
import { normalize, putRelationsToStore } from 'utils'
import moment from 'moment'
import uniqId from 'uniqid'

import {
  CREATE_USER_FULFILLED,
  LOAD_USERS_FULFILLED,
  UPDATE_USER_FULFILLED,
  DESTROY_USER_FULFILLED,
  CREATE_TEMP_USER,
} from 'src/redux/users/action'

/*
 *  Create message from ChatForm
 */
const createTempUser = (token) => ({
  id: token,
  name: 'New User',
  updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
  created_at: moment().format('YYYY-MM-DD HH:mm:ss')
})

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

function* newUser() {
  const tempUser = createTempUser(`temp-${uniqId()}`)
  yield put(actions.users.set(tempUser))
}

export default function* saga() {
  yield all([
    takeEvery(LOAD_USERS_FULFILLED, setUsers),
    takeEvery(CREATE_USER_FULFILLED, setUser),
    takeEvery(UPDATE_USER_FULFILLED, setUser),
    takeEvery(DESTROY_USER_FULFILLED, removeUser),
    takeEvery(CREATE_TEMP_USER, newUser)
  ])
}
