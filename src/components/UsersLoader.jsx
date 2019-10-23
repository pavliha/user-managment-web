import React, { useState } from 'react'
import { object, func, shape, arrayOf, number, bool, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Loader, UsersList, Loading } from 'components'
import { actions, connect, select } from 'src/redux'
import userShape from 'shapes/user'
import classNames from 'classnames'

const styles = {
  root: {},

  loading: {
    position: 'absolute',
    width: '100%',
    bottom: 5,
    display: 'flex',
    justifyContent: 'center',
  }
}

const UsersLoader = ({ classes, className, redux }) => {
  const [isLoading, setLoading] = useState(true)
  const { users, loadUsers, status, paginateUsers } = redux
  const { page, limit, is_active, search } = status

  return (
    <Loader
      params={{ page, limit, is_active, search }}
      load={loadUsers}
      onLoading={setLoading}
    >
      <UsersList
        className={classNames([classes.root, className])}
        users={users}
        onScrollBottom={() => paginateUsers({ page: page + 1 })}
      />
      {isLoading && <Loading size={64} className={classes.loading} />}
    </Loader>
  )
}

UsersLoader.propTypes = {
  classes: object.isRequired,
  className: string,
  redux: shape({
    loadUsers: func.isRequired,
    paginateUsers: func.isRequired,
    users: arrayOf(userShape),
    status: shape({
      page: number,
      limit: number,
      is_active: bool,
      search: string,
    })
  })
}

const redux = state => ({
  users: select.users.filtered(state),
  status: state.users.status,
  filterUsers: actions.users.filter,
  paginateUsers: actions.users.paginate,
  loadUsers: actions.users.loadMany,
  addUser: actions.users.add,
})

export default withStyles(styles)(connect(redux)(UsersLoader))
