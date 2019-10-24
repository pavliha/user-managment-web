import React, { Component } from 'react'
import { object, func, bool, string, oneOf } from 'prop-types'
import { FormHelperText, Typography, withStyles } from '@material-ui/core'
import { RoleRadio } from 'components'

const styles = {
  container: {
    display: 'flex',
  },
}

class RolesField extends Component {

  change = (value) => {
    const { name, onChange } = this.props
    onChange(name, value)
  }

  render() {
    const { classes, label, value, helperText, error } = this.props

    return (
      <div className={classes.root}>
        <Typography gutterBottom>{label}</Typography>
        <div className={classes.container}>
          <RoleRadio
            name="user"
            value={value}
            label="User"
            onSelect={this.change}
          />
          <RoleRadio
            name="manager"
            value={value}
            label="Manager"
            onSelect={this.change}
          />
          <RoleRadio
            name="admin"
            value={value}
            label="Admin"
            onSelect={this.change}
          />
          <RoleRadio
            name="support"
            label="Support"
            value={value}
            onSelect={this.change}
          />
        </div>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </div>
    )
  }
}

RolesField.propTypes = {
  classes: object.isRequired,
  label: string,
  name: string,
  value: oneOf(['', 'user', 'manager', 'admin', 'support']),
  helperText: string,
  error: bool,
  onChange: func,
}

RolesField.defaultProps = {
  onChange: () => {}
}
export default withStyles(styles)(RolesField)
