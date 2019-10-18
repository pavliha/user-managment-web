import api from 'src/api'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

export const LOAD_USERS = 'LOAD_USER'
export const LOAD_USERS_FULFILLED = 'LOAD_USER_FULFILLED'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED'

export const DESTROY_USER = 'DESTROY_USER'
export const DESTROY_USER_FULFILLED = 'DESTROY_USER_FULFILLED'

export const REMOVE_USER = 'REMOVE_USER'

export const CREATE_TEMP_USER = 'CREATE_TEMP_USER'
/**
 * Async actions. Making API requests
 */

const loadMany = (params) => ({
  type: LOAD_USERS,
  payload: api.users.loadMany(params)
})

const create = form => ({
  type: CREATE_USER,
  payload: api.users.create(form)
})

const update = (user_id, form) => ({
  type: UPDATE_USER,
  payload: api.users.update(user_id, form)
})

const destroy = user_id => ({
  type: DESTROY_USER,
  payload: api.users.destroy(user_id)
})

/**
 * Sync actions. Updating store
 */

const add = () => ({
  type: CREATE_TEMP_USER,
})

const setMany = users => ({
  type: SET_USERS,
  payload: users,
})

const set = user => ({
  type: SET_USER,
  payload: user,
})

const remove = user_id => ({
  type: REMOVE_USER,
  payload: user_id,
})

export default {
  loadMany,
  create,
  update,
  destroy,
  add,
  setMany,
  set,
  remove,
}
