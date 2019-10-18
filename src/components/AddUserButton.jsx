import React from 'react'
import { object, func, string } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import classNames from 'classnames'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  text: {
    fontSize: 20,
    paddingLeft: 5,
  }
}

const AddUserButton = ({ classes, className, onClick }) =>
  <div className={classNames([classes.root, className])} onClick={onClick}>
    <IconButton color="primary">
      <AddCircleOutlineIcon />
    </IconButton>
    <Typography className={classes.text}>
      add user
    </Typography>
  </div>

AddUserButton.propTypes = {
  classes: object.isRequired,
  className: string,
  onClick: func,
}

export default withStyles(styles)(AddUserButton)
