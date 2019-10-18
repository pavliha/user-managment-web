import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}

const AddUserButton = ({ classes, onClick }) =>
  <div className={classes.root} onClick={onClick}>
    <IconButton>
      <PlusIcon />
    </IconButton>
    <Typography variant="h6">
      Add user
    </Typography>
  </div>

AddUserButton.propTypes = {
  classes: object.isRequired,
  onClick: func,
}

export default withStyles(styles)(AddUserButton)
