import { number, oneOfType, shape, string } from 'prop-types'

const userShape = shape({
  id: oneOfType([number, string]).isRequired,
  name: string,
  avatar_url: string,
  email: string,
  skype: string,
  signature: string,
  created_at: string,
  updated_at: string,
})

export default userShape
