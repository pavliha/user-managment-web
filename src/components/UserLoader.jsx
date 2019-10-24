import React, { useState } from 'react'
import { func, string, shape, node, oneOfType, number } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Loader, Loading } from 'components'
import isNumber from 'lodash/isNumber'
import { connect, actions } from 'src/redux'
import userShape from 'shapes/user'

const styles = {
  root: {},
}

const UserLoader = ({ id, children, redux: { loadUser } }) => {
  const [isLoading, setLoading] = useState(false)

  const load = id => isNumber(id) ? loadUser(id) : () => {}

  return (
    <Loader
      params={id}
      load={load}
      onLoading={setLoading}
    >
      {isLoading ? <Loading /> : children}
    </Loader>
  )
}

UserLoader.propTypes = {
  id: oneOfType([string, number]),
  children: node,
  redux: shape({
    user: userShape,
    loadUser: func.isRequired,
  })
}

const redux = () => ({
  loadUser: actions.users.load,
})

export default withStyles(styles)(connect(redux)(UserLoader))
