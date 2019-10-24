import React, { useCallback } from 'react'
import { bool, func, object, shape } from 'prop-types'
import { Box, TextField, Typography, withStyles } from '@material-ui/core'
import { Form } from 'formik'
import { Field, AvatarField, ServerMessage } from 'components'
import * as Yup from 'yup'
import debounce from 'lodash/debounce'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    maxWidth: 500,
    flex: 1,
  }

}

const ProfileForm = ({ classes, formik: { submitForm, status } }) => {
  const submit = useCallback(debounce(submitForm, 3000), [])

  return (
    <Form className={classes.root}>
      <Field
        name="avatar_url"
        component={AvatarField}
        onChange={submit}
      />
      <Box p={2} className={classes.info}>
        <Field
          name="name"
          margin="normal"
          label="Name"
          component={TextField}
          onChange={submit}
        />
        <Field
          name="email"
          label="Email"
          margin="normal"
          component={TextField}
          onChange={submit}
        />
        <Field
          name="skype"
          label="Skype"
          margin="normal"
          component={TextField}
          onChange={submit}
        />
        <Field
          name="signature"
          label="Signature"
          margin="normal"
          component={TextField}
          onChange={submit}
        />
        <Box pt={5}>
          {!status?.success_message &&
          <Typography variant="caption" color="textSecondary">Waiting for changes...</Typography>}
          <ServerMessage color="error" name="non_field_error" />
          <ServerMessage color="primary" name="success_message" />
        </Box>
      </Box>
    </Form>
  )
}

ProfileForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    submitForm: func,
    isSubmitting: bool,
  })
}

ProfileForm.mapPropsToValues = ({ user }) => ({
  avatar_url: user?.avatar_url || '',
  name: user?.name || '',
  email: user?.email || '',
  skype: user?.skype || '',
  signature: user?.signature || ''
})

ProfileForm.validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'Name is invalid')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  skype: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  signature: Yup.string()
})

export default withStyles(styles)(ProfileForm)
