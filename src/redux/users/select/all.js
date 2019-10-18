import { createSelector } from 'reselect'

const all = (users) => users

export default createSelector(
  state => Object.values(state.users.entities),
  all,
)
