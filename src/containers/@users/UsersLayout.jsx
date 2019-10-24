import React from 'react'
import { Header } from 'components'
import { Box, withStyles } from '@material-ui/core'
import { object, shape, string } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import ProfileScene from './@id/ProfileScene'
import RolesScene from './@id/RolesScene'
import SettingsScene from './@id/SettingsScene'

const styles = {
  root: {
    flex: 1,
  }
}

const UsersLayout = ({ classes, match: { params } }) =>
  <div className={classes.root}>
    <Header user_id={params.id} />
    <Box p={3}>
      <Switch>
        <Route exact path="/users/:id/profile" component={ProfileScene} />
        <Route exact path="/users/:id/roles" component={RolesScene} />
        <Route exact path="/users/:id/settings" component={SettingsScene} />
      </Switch>
    </Box>
  </div>

UsersLayout.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string }) })
}

export default withStyles(styles)(UsersLayout)
