import React from 'react'
import { number, object, oneOfType, string } from 'prop-types'
import { withStyles, AppBar, Tab, Tabs } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

const styles = {
  root: {},
}

const links = id => [
  {
    to: `/users/${id}/profile`,
    label: 'Profile'
  },
  {
    to: `/users/${id}/roles`,
    label: 'User Roles',
    disabled: id.includes('temp'),
  },
  {
    to: `/users/${id}/settings`,
    label: 'Settings',
    disabled: id.includes('temp'),
  }
]

const Header = ({ classes, user_id }) => {
  const history = useHistory()
  const navigate = (e, value) => history.push(value)
  const link = links(user_id).find(link => link.to === history.location.pathname)

  return (
    <AppBar className={classes.root} position="static">
      <Tabs value={link?.to || false} onChange={navigate}>
        {links(user_id).map(link =>
          <Tab
            key={link.to}
            component={Link}
            to={link.to}
            disabled={link.disabled}
            label={link.label}
            value={link.to}
          />
        )}
      </Tabs>
    </AppBar>
  )
}

Header.propTypes = {
  classes: object.isRequired,
  user_id: oneOfType([number, string]),
}

export default withStyles(styles)(Header)
