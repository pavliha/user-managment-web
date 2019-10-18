import Http from 'src/services/Http'
import user from './user'

const auth = {

  user,

  register(credentials) {
    return Http.post('/auth/register', credentials)
  },

  login(credentials) {
    return Http.post('/auth/login', credentials)
  },

  activate(hash) {
    return Http.get(`/auth/activate/${hash}`)
  },

  logout() {
    return Http.post('/auth/logout')
  },
}

export default auth
