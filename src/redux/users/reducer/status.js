import { FILTER_USERS, LOAD_USERS_FULFILLED, PAGINATE_USERS } from '../action'

const initialState = {
  page: 1,
  lastPage: 1,
  limit: 40,
  search: '',
  is_active: true,
  total: null,
  visible: [],
  is_filtering: false,
}

const statusReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_USERS_FULFILLED: {

      const hasSearchChanged = state.is_filtering
      const users_ids = payload.data.map(user => user.id)
      const results = hasSearchChanged ? users_ids : [...state.visible, ...users_ids]

      return {
        ...state,
        total: payload.total,
        limit: Number(payload.perPage),
        visible: state.search ? results : [],
        is_filtering: false,
      }
    }

    case FILTER_USERS:
      return {
        ...state,
        page: 1,
        search: payload ? payload.search : state.search,
        is_active: payload ? payload.is_active : state.is_active,
        is_filtering: true
      }

    case PAGINATE_USERS: {

      const shouldPaginate = payload && (state.page * state.limit) < state.total

      return {
        ...state,
        page: shouldPaginate ? payload.page : state.page,
        lastPage: payload.page > state.page ? payload.page : state.page,
        limit: shouldPaginate ? payload.limit : state.limit,
      }
    }
    default:
      return state
  }
}

export default statusReducer
