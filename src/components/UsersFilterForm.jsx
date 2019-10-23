import React, { useCallback } from 'react'
import { func, object, shape } from 'prop-types'
import { TextField, withStyles, InputAdornment } from '@material-ui/core'
import { Form } from 'formik'
import { UserActiveField, Field } from 'components'
import debounce from 'lodash/debounce'
import SearchIcon from 'mdi-react/SearchIcon'

const styles = {
  root: {},
  searchIcon: {
    color: 'rgba(0,0,0,0.6)'
  }

}

const UsersFilterForm = ({ classes, formik: { submitForm } }) =>
  <Form className={classes.root}>
    <Field
      name="search"
      component={TextField}
      placeholder="Search..."
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>
      }}
      onChange={useCallback(debounce(submitForm, 500), [])}
    />
    <Field
      name="is_active"
      component={UserActiveField}
      onChange={() => setTimeout(submitForm)}
    />
  </Form>

UsersFilterForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    submitForm: func,
  })
}

UsersFilterForm.mapPropsToValues = ({ is_active, search }) => ({
  search,
  is_active,
})

export default withStyles(styles)(UsersFilterForm)
