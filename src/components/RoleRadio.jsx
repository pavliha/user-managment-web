import React from 'react'
import { object, string, func } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    width: 60,
    padding: '5px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    }
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    backgroundColor: 'white',
    border: '1px solid rgba(0,0,0,0.5)',
    marginBottom: 10,
  },
  active: {
    backgroundColor: 'green',
  }
}

const RoleRadio = ({ classes, label, name, value, onSelect }) =>
  <div className={classes.root} onClick={() => onSelect(name)}>
    <div className={classNames({
      [classes.circle]: true,
      [classes.active]: name === value
    })} />
    <Typography>{label}</Typography>
  </div>

RoleRadio.propTypes = {
  classes: object.isRequired,
  name: string,
  value: string,
  label: string,
  onSelect: func,
}
RoleRadio.defaultProps = {
  onSelect: () => {}
}

export default withStyles(styles)(RoleRadio)
