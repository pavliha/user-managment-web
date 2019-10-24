import React from 'react'
import { object } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'

const styles = {
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

}

const IndexScene = ({ classes }) =>
  <div className={classes.root}>
    <Typography variant="caption">
      Select user to see info
    </Typography>
  </div>

IndexScene.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(IndexScene)
