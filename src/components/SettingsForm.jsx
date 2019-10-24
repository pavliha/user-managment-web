import React, { useCallback } from 'react'
import { func, object, shape } from 'prop-types'
import { Box, withStyles } from '@material-ui/core'
import { Form } from 'formik'
import { Field, AvatarField, ServerMessage, SwitchField } from 'components'
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

const SettingsForm = ({ classes, formik: { submitForm } }) => {
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
          name="is_active"
          label="Disable"
          component={SwitchField}
          onChange={submit}
        />
        <Box pt={5}>
          <ServerMessage color="error" name="non_field_error" />
          <ServerMessage color="primary" name="success_message" />
        </Box>
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
