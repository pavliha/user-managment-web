import Http from 'services/Http'
import qs from 'querystring'
import clean from 'clean-object'

const users = {

  load(id) {
    return Http.get(`/users/${id}`)
  },

  loadMany({ page, limit, is_active, search }) {
    const query = qs.stringify(clean({ page, limit, is_active, search }))
    return Http.get(`/users?${query}`)
  },

  create(form) {
    return Http.post(`/users`, form)
  },

  update(user_id, form) {
    return Http.put(`/users/${user_id}`, form)
  },

  destroy(user_id) {
    return Http.delete(`/users/${user_id}`)
  }
}

export default users
