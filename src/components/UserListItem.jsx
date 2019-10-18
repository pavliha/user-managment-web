import React from 'react'
import { object } from 'prop-types'
import { ListItemAvatar, ListItemText, withStyles } from '@material-ui/core'
import { userShape } from 'shapes'

const styles = {
  root: {},
}

const UserListItem = ({ classes, user }) =>
  <div className={classes.root}>
    <ListItemAvatar />
    <ListItemText primary={user.name} />
  </div>

UserListItem.propTypes = {
  classes: object.isRequired,
  user: userShape,
}

export default withStyles(styles)(UserListItem)
