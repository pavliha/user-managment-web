import { number, shape, string } from 'prop-types'

const userShape = shape({
  id: number.isRequired,
  name: string,
  email: string,
  skype: string,
  signature: string,
  created_at: string,
  updated_at: string,
})

export default userShape
