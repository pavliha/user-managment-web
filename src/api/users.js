import Http from 'services/Http'

const users = {

  loadMany(page, limit) {
    return Http.get('/users', { page, limit })
  },

  create(form) {
    return Http.put(`/users`, form)
  },

  update(user_id, form) {
    return Http.put(`/users/${user_id}`, form)
  },

  destroy(user_id) {
    return Http.delete(`/users/${user_id}`)
  }
}

export default users
