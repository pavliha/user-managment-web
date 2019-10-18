import React, { Component } from 'react'
import { object, func, shape, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'
import ProfileScene from './@profile/ProfileScene'
import { AddUserButton, UsersFilterForm, UsersList, Form, Loader } from 'components'
import userShape from 'shapes/user'
import { select, actions, connect } from 'src/redux'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
  },
  users: {
    boxSizing: 'border-box',
    width: 300,
    borderRight: '1px solid rgba(0,0,0,0.1)'
  },
  container: {
    flex: 1,
  },
  filter: {
    padding: '15px',
  },
  addUserButton: {
    marginBottom: 15,
  },
  usersList: {
    marginTop: 15,
  }
}

class Layout extends Component {

  state = {
    search: '',
    is_active: true,
  }

  searchUsers = ({ search, is_active }) => {
    this.setState({ is_active, search: search || '' })
  }

  render() {
    const { classes, redux: { users, addUser, loadUsers } } = this.props
    const { is_active, search } = this.state

    return (
      <div className={classes.root}>
        <Loader
          load={loadUsers}
          params={{ is_active, search }}
          className={classes.users}
        >
          <div className={classes.filter}>
            <AddUserButton className={classes.addUserButton} onClick={addUser} />
            <Form
              is_active={is_active}
              search={search}
              component={UsersFilterForm}
              onSubmit={this.searchUsers}
            />
          </div>
          <UsersList className={classes.usersList} users={users} />
        </Loader>
        <div className={classes.container}>
          <Switch>
            <Route path="/profile" component={ProfileScene} />
          </Switch>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  classes: object.isRequired,
  redux: shape({
    loadUsers: func.isRequired,
    addUser: func.isRequired,
    users: arrayOf(userShape),
  })
}

const redux = state => ({
  users: select.users.search(state),
  loadUsers: actions.users.loadMany,
  addUser: actions.users.add,
})
export default withStyles(styles)(connect(redux)(Layout))
