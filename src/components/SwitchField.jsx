import React, { Component } from 'react'
import { object, func, bool, string } from 'prop-types'
import { withStyles, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'
import { Switch } from 'components'

const styles = {
  root: {},
}

class SwitchField extends Component {

  change = e => {
    const { name, onChange } = this.props
    onChange(name, !e.target.checked)
  }

  render() {
    const { classes, label, value, helperText, error } = this.props

    return (
      <FormControl className={classes.root}>
        <FormControlLabel
          control={<Switch checked={!value} onChange={this.change} />}
          label={label}
        />
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}

SwitchField.propTypes = {
  classes: object.isRequired,
  label: string,
  name: string,
  value: bool,
  helperText: string,
  error: bool,
  onChange: func,
}

export default withStyles(styles)(SwitchField)
