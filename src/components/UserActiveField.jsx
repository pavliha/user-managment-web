import React, { Component } from 'react'
import { object, func, bool, string } from 'prop-types'
import { FormHelperText, Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {

  field: {
    display: 'flex',
  },
  toggle: {
    color: 'rbga(0,0,0,0.5)'
  },
  enabled: {
    fontWeight: 'bold',
    color: 'rbga(0,0,0,1)'
  }
}

class UserActiveField extends Component {

  enable = () => {
    const { name, onChange } = this.props
    onChange(name, true)
  }

  disable = () => {
    const { name, onChange } = this.props
    onChange(name, false)
  }

  toggleStyle = enabled => {
    const { classes } = this.props
    return classNames({ [classes.toggle]: true, [classes.enabled]: enabled })
  }

  render() {
    const { classes, value, error, helperText } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.field}>
          <Typography className={this.toggleStyle(value)} onClick={this.enable}>Enabled</Typography>
          <Typography className={this.toggleStyle(!value)} onClick={this.disable}>Disabled</Typography>
        </div>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </div>
    )
  }
}

UserActiveField.propTypes = {
  classes: object.isRequired,
  name: string,
  value: bool,
  onChange: func.isRequired,
  error: bool,
  helperText: string,
}

export default withStyles(styles)(UserActiveField)
