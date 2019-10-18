import { createSelector } from 'reselect'
import compact from 'lodash/compact'

const search = (users, users_ids) => {
  return compact(users_ids.map(id => users[id]))
}

export default createSelector(
  state => state.users.entities,
  state => state.users.search.users_ids,
  search,
)
