import React from 'react'
import { object, func, shape, arrayOf } from 'prop-types'
import { withStyles, TextField } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import ProfileScene from './@profile/ProfileScene'
import { AddUserButton, UserActiveField, UsersList } from 'components'
import userShape from 'shapes/user'
import { select, actions, connect } from 'src/redux'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
  },
  users: {
    width: 300,
  },
  container: {
    flex: 1,
  }
}

const Layout = ({ classes, redux: { users, addUser } }) =>
  <div className={classes.root}>
    <div className={classes.users}>
      <AddUserButton onClick={addUser} />
      <TextField name="search" placeholder="Search..." />
      <UserActiveField name="is_active" value />
      <UsersList users={users} />
    </div>
    <div className={classes.container}>
      <Switch>
        <Route path="/profile" component={ProfileScene} />
      </Switch>
    </div>
  </div>

Layout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    addUser: func.isRequired,
    users: arrayOf(userShape),
  })
}

const redux = state => ({
  users: select.users.all(state),
  addUser: actions.users.add,
})
export default withStyles(styles)(connect(redux)(Layout))
