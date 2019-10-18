import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {},
}

const ProfileScene = ({ classes }) =>
  <div className={classes.root}>
    profile
  </div>

ProfileScene.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(ProfileScene)
