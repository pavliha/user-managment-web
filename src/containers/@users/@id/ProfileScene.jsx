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

  submit = async (form, formikBag) => {
    const { history, redux: { user, createUser, updateUser } } = this.props
    if (isNumber(user.id)) return updateUser(user.id, form)
    const action = await createUser({ ...form, token: user.token })
    history.push(`/users/${action.value.id}/profile`)
    formikBag.setStatus({ success_message: 'Changes saved!' })
    return action
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
