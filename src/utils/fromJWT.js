import JWT from 'jwt-decode'

const fromJWT = (token) => {
  if (!token) return null

  return JWT(token).data
}

export default fromJWT
