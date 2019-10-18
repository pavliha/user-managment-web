import { LOAD_USERS_FULFILLED } from '../action'

const initialState = {
  users_ids: []
}

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_USERS_FULFILLED:
      return {
        ...state,
        users_ids: payload.data.map(u => u.id),
      }

    default:
      return state
  }
}

export default searchReducer
