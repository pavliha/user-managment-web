import React from 'react'
import { bool, func, object, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import { AddUserButton, Form, UsersFilterForm, UsersLoader } from 'components'
import { actions, connect } from 'src/redux'
import IndexScene from './IndexScene'
import UsersLayout from './@users/UsersLayout'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    height: '100%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxSizing: 'border-box',
    width: 300,
    borderRight: '1px solid rgba(0,0,0,0.1)'
  },
  filter: {
    padding: '15px',
  },
  addUserButton: {
    marginBottom: 15,
  },
  list: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  }
}

const Layout = ({ classes, redux: { status, addUser, filterUsers } }) =>
  <div className={classes.root}>
    <div className={classes.sidebar}>
      <div className={classes.filter}>
        <AddUserButton className={classes.addUserButton} onClick={addUser} />
        <Form
          is_active={status.is_active}
          search={status.search}
          component={UsersFilterForm}
          onSubmit={filterUsers}
        />
      </div>
      <UsersLoader className={classes.list} />
    </div>
    <Switch>
      <Route exact path="/" component={IndexScene} />
      <Route path="/users/:id" component={UsersLayout} />
    </Switch>
  </div>

Layout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    filterUsers: func.isRequired,
    addUser: func.isRequired,
    status: shape({
      is_active: bool,
    })
  })
}

const redux = state => ({
  status: state.users.status,
  filterUsers: actions.users.filter,
  addUser: actions.users.add,
})
export default withStyles(styles)(connect(redux)(Layout))
