import React from 'react'
import { object } from 'prop-types'
import { ListItemAvatar, ListItemText, ListItem, withStyles, Avatar } from '@material-ui/core'
import { userShape } from 'shapes'
import initials from 'name-initials'
import { Link } from 'react-router-dom'

const styles = {
  root: {},
}

const UserListItem = ({ classes, user }) =>
  <ListItem
    component={Link}
    to={`/users/${user.id}/profile`}
    button
    className={classes.root}
  >
    <ListItemAvatar>
      <Avatar alt={user.name} src={user.avatar_url}>
        {!user.avatar_url ? initials(user.name) : null}
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={user.name} />
  </ListItem>

UserListItem.propTypes = {
  classes: object.isRequired,
  user: userShape,
}

export default withStyles(styles)(UserListItem)
