import React, { useCallback, useState } from 'react'
import { func, object, shape } from 'prop-types'
import { Box, Typography, withStyles } from '@material-ui/core'
import { Form } from 'formik'
import { Field, AvatarField, ServerMessage, SwitchField } from 'components'
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

const SettingsForm = ({ classes, formik: { submitForm } }) => {
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
          name="is_active"
          label="Disable"
          component={SwitchField}
          onChange={handleChange}
        />
      </Box>
    </Form>
  )
}

SettingsForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    submitForm: func,
  })
}

SettingsForm.mapPropsToValues = ({ user }) => ({
  avatar_url: user?.avatar_url || '',
  is_active: user?.is_active,
})

SettingsForm.validationSchema = Yup.object().shape({})

export default withStyles(styles)(SettingsForm)
