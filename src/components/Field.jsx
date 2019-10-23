import React, { Component } from 'react'
import { func, string, elementType, bool } from 'prop-types'
import { Field as FormikField } from 'formik'

class Field extends Component {

  handleChange = (form) => (first, second) => {
    const { onChange } = this.props
    const value = first?.target?.value || second
    const name = first?.target?.name || first

    form.setFieldValue(name, value)
    onChange(name, value, form)
  }

  render() {
    const { name, component: Component, fullWidth, ...props } = this.props
    return (
      <FormikField name={name} render={({ field, form }) => {
        const { value, name } = field

        return (
          <Component
            {...props}
            name={name}
            value={value}
            fullWidth={fullWidth}
            onChange={this.handleChange(form)}
            error={(form.submitCount > 0) && !!form.errors[name]}
            helperText={(form.submitCount > 0) ? form.errors[name] : undefined}
            onError={(error) => form.setErrors({ [name]: error })}
          />
        )
      }
      } />
    )
  }
}

Field.propTypes = {
  name: string,
  component: elementType,
  placeholder: string,
  fullWidth: bool,
  onChange: func,
}

Field.defaultProps = {
  onChange: () => {},
  fullWidth: true
}

export default Field
