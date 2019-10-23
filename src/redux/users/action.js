import api from 'src/api'

export const LOAD_USER = 'LOAD_USER'
export const LOAD_USER_FULFILLED = 'LOAD_USER_FULFILLED'

export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_USERS_FULFILLED = 'LOAD_USERS_FULFILLED'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_FULFILLED = 'CREATE_USER_FULFILLED'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED'

export const DESTROY_USER = 'DESTROY_USER'
export const DESTROY_USER_FULFILLED = 'DESTROY_USER_FULFILLED'

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const CLEAR_USERS = 'CLEAR_USERS'
export const FILTER_USERS = 'FILTER_USERS'
export const PAGINATE_USERS = 'PAGINATE_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const CREATE_TEMP_USER = 'CREATE_TEMP_USER'

/**
 * Async actions. Making API requests
 */

const load = (user_id) => ({
  type: LOAD_USER,
  payload: api.users.load(user_id)
})

const loadMany = (params) => ({
  type: LOAD_USERS,
  payload: api.users.loadMany(params),
  meta: params,
})

const create = ({ token, ...form }) => ({
  type: CREATE_USER,
  payload: api.users.create(form),
  meta: { token }
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

const filter = ({ search, is_active }) => ({
  type: FILTER_USERS,
  payload: { search, is_active }
})

const paginate = ({ page, limit }) => ({
  type: PAGINATE_USERS,
  payload: { page, limit }
})

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

const clear = () => ({
  type: CLEAR_USERS,
})

export default {
  load,
  loadMany,
  create,
  update,
  destroy,
  add,
  filter,
  paginate,
  setMany,
  set,
  remove,
  clear,
}
