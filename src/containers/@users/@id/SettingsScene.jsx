import React, { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Form, SettingsForm, UserLoader } from 'components'
import { actions, connect } from 'src/redux'
import userShape from 'shapes/user'

const styles = {
  root: {},
}

class SettingsScene extends Component {

  submit = async (form, formikBag) => {
    const { user, updateUser } = this.props.redux
    const action = await updateUser(user.id, form)
    formikBag.setStatus({ success_message: 'Changes saved!' })
    setTimeout(() => formikBag.setStatus({ success_message: null }), 3000)
    return action
  }

  render() {
    const { classes, match, redux: { user } } = this.props

    return (
      <UserLoader id={match.params.id}>
        <div className={classes.root}>
          <Form
            user={user}
            component={SettingsForm}
            onSubmit={this.submit}
          />
        </div>
      </UserLoader>
    )
  }
}

SettingsScene.propTypes = {
  classes: object.isRequired,
  match: shape({ params: shape({ id: string }) }),
  redux: shape({
    user: userShape,
    updateUser: func.isRequired,
  })
}

const redux = (state, { match: { params } }) => ({
  user: state.users.entities[params.id],
  updateUser: actions.users.update,
})

export default withStyles(styles)(connect(redux)(SettingsScene))
