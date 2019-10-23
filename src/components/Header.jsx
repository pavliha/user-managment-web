import React from 'react'
import { object } from 'prop-types'
import { withStyles, AppBar, Tab, Tabs } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

const styles = {
  root: {},
}

const links = [
  {
    to: '/profile',
    label: 'Profile'
  },
  {
    to: '/roles',
    label: 'User Roles'
  },
  {
    to: '/settings',
    label: 'Settings'
  }
]

const Header = ({ classes }) => {
  const { push, location: { pathname } } = useHistory()
  const navigate = (e, value) => push(value)
  const link = links.find(link => link.to === pathname)

  return (
    <AppBar className={classes.root} position="static">
      <Tabs value={link?.to || false} onChange={navigate}>
        {links.map(link =>
          <Tab
            key={link.to}
            component={Link}
            to={link.to}
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
}

export default withStyles(styles)(Header)
