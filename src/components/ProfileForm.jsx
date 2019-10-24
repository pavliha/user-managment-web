import React, { useCallback, useState } from 'react'
import { bool, func, object, shape } from 'prop-types'
import { Box, TextField, Typography, withStyles } from '@material-ui/core'
import { Form } from 'formik'
import { Field, AvatarField, ServerMessage } from 'components'
import * as Yup from 'yup'
import debounce from 'lodash/debounce'

const styles = {
  root: {
    display: 'flex',
  },
  info: {
    maxWidth: 500,
    flex: 1,
  }

}

const ProfileForm = ({ classes, formik: { submitForm, status } }) => {
  const [isSaving, setSaving] = useState(false)

  const handleChange = useCallback(() => {
    const submit = debounce(() => {
      submitForm()
      setSaving(false)
    }, 3000)
    setSaving(true)
    return submit()
  }, [submitForm])

  return (
    <Form className={classes.root}>
      <div>
        <Field
          name="avatar_url"
          component={AvatarField}
          onChange={handleChange}
        />
        <Box pt={2}>
          {!status?.success_message && (
            !isSaving
              ? <Typography variant="caption" color="textSecondary">Waiting for changes...</Typography>
              : <Typography variant="caption" color="textSecondary">Saving new data...</Typography>
          )}
          <ServerMessage color="error" name="non_field_error" />
          <ServerMessage variant="caption" color="textSecondary" name="success_message" />
        </Box>
      </div>

      <Box pl={2} className={classes.info}>
        <Field
          name="name"
          margin="normal"
          label="Name"
          component={TextField}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Email"
          margin="normal"
          component={TextField}
          onChange={handleChange}
        />
        <Field
          name="skype"
          label="Skype"
          margin="normal"
          component={TextField}
          onChange={handleChange}
        />
        <Field
          name="signature"
          label="Signature"
          margin="normal"
          component={TextField}
          onChange={handleChange}
        />
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
