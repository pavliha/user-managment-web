import React, { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Form, SettingsForm, UserLoader } from 'components'
import { actions, connect } from 'src/redux'
import userShape from 'shapes/user'
import isNumber from 'lodash/isNumber'

const styles = {
  root: {},
}

class SettingsScene extends Component {

  submit = async form => {
    const { user, updateUser } = this.props.redux
    if (isNumber(user.id)) return updateUser(user.id, form)
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
