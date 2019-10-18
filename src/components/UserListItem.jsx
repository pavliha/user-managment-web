import React from 'react'
import { object } from 'prop-types'
import { ListItemAvatar, ListItemText, ListItem, withStyles, Avatar } from '@material-ui/core'
import { userShape } from 'shapes'

const styles = {
  root: {},
}

const UserListItem = ({ classes, user }) =>
  <ListItem button className={classes.root}>
    <ListItemAvatar>
      <Avatar alt={user.name} src={user.avatar_url} />
    </ListItemAvatar>
    <ListItemText primary={user.name} />
  </ListItem>

UserListItem.propTypes = {
  classes: object.isRequired,
  user: userShape,
}

export default withStyles(styles)(UserListItem)
