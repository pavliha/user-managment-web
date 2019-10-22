import { createSelector } from 'reselect'
import compact from 'lodash/compact'

const filtered = (users, status) => {
  const { visible, search } = status
  const usersArray = Object.values(users)
  const usersFromSearch = compact(visible.map(id => users[id]))
  const results = search ? usersFromSearch : usersArray
  const filteredUsers = results.filter(users => users.is_active === status.is_active && !users.token)
  const sortedUsers = filteredUsers.sort((prev, next) => next.created_at - prev.created_at)
  const tempUsers = usersArray.filter(user => user.token)
  return [...sortedUsers, ...tempUsers]
}

export default createSelector(
  state => state.users.entities,
  state => state.users.status,
  filtered,
)
