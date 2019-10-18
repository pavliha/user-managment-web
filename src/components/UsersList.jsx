import React from 'react'
import { object, arrayOf } from 'prop-types'
import { withStyles, List } from '@material-ui/core'
import { UserListItem } from 'components'
import { userShape } from 'shapes'

const styles = {
  root: {},
}

const UsersList = ({ classes, users }) =>
  <List className={classes.root}>
    {users.map(user => <UserListItem user={user} />)}
  </List>

UsersList.propTypes = {
  classes: object.isRequired,
  users: arrayOf(userShape)
}

export default withStyles(styles)(UsersList)
