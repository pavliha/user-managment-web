import React, { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Form, ProfileForm, UserLoader } from 'components'
import { actions, connect } from 'src/redux'
import userShape from 'shapes/user'
import isNumber from 'lodash/isNumber'

const styles = {
  root: {},
}

class ProfileScene extends Component {

  save = async (callback, form, formikBag) => {
    formikBag.setStatus({ success_message: 'Saving changes!' })
    const action = await callback(form)
    formikBag.setStatus({ success_message: 'Changes saved!' })
    setTimeout(() => formikBag.setStatus({ success_message: null }), 3000)
    return action
  }

  create = async form => {
    const { history, redux: { user, createUser } } = this.props
    const action = await createUser({ ...form, token: user.token })
    history.push(`/users/${action.value.id}/profile`)
    return action
  }

  update = form => {
    const { redux: { user, updateUser } } = this.props
    return updateUser(user.id, form)
  }

  submit = async (form, formikBag) => {
    const { redux: { user } } = this.props
    const isUserExist = isNumber(user.id)

    return isUserExist
      ? this.save(this.update, form, formikBag)
      : this.save(this.create, form, formikBag)

  }

  render() {
    const { classes, match, redux: { user } } = this.props

    return (
      <UserLoader id={match.params.id}>
        <div className={classes.root}>
          <Form
            user={user}
            component={ProfileForm}
            onSubmit={this.submit}
          />
        </div>
      </UserLoader>
    )
  }
}

ProfileScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  match: shape({ params: shape({ id: string }) }),
  redux: shape({
    user: userShape,
    createUser: func.isRequired,
    updateUser: func.isRequired,
  })
}

const redux = (state, { match: { params } }) => ({
  user: state.users.entities[params.id],
  createUser: actions.users.create,
  updateUser: actions.users.update,
})

export default withStyles(styles)(connect(redux)(ProfileScene))
