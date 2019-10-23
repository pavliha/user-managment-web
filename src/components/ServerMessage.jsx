import React from 'react'
import { object, oneOf, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { connect, getIn } from 'formik'

const styles = {
  root: {},
}

const ServerMessage = ({ classes, formik: { status, errors }, name, color, variant, className, ...rest }) => {
  const message = getIn(errors, name) || (status && status[name])

  return (
    <Typography
      {...rest}
      className={className}
      variant={variant}
      color={color}
    >
      {message}
    </Typography>
  )
}

ServerMessage.propTypes = {
  className: string,
  color: oneOf(['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']),
  classes: object.isRequired,
  formik: object.isRequired,
  name: string.isRequired,
  variant: oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'caption',
    'button',
    'overline'
  ]),
}

export default withStyles(styles)(connect(ServerMessage))
