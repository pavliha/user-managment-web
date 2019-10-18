import React from 'react'
import { object, arrayOf, string } from 'prop-types'
import { withStyles, List } from '@material-ui/core'
import { UserListItem } from 'components'
import { userShape } from 'shapes'
import classNames from 'classnames'

const styles = {
  root: {},
}

const UsersList = ({ classes, className, users }) =>
  <List className={classNames([classes.root, className])}>
    {users.map(user => <UserListItem key={user.id} user={user} />)}
  </List>

UsersList.propTypes = {
  classes: object.isRequired,
  className: string,
  users: arrayOf(userShape)
}

export default withStyles(styles)(UsersList)
