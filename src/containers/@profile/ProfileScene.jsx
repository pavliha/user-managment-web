import React, { useState } from 'react'
import { func, object, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { Form, ProfileForm, Loader, Loading } from 'components'
import { actions, connect } from 'src/redux'
import userShape from 'shapes/user'
import { useHistory, useParams } from 'react-router-dom'
import isNumber from 'lodash/isNumber'

const styles = {
  root: {},
}

const ProfileScene = ({ classes, redux }) => {

  const { user, createUser, loadUser, updateUser } = redux
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const { id } = useParams()

  const submit = async (form, formikBag) => {
    if (isNumber(user.id)) return updateUser(user.id, form)
    const action = await createUser({ ...form, token: user.token })
    history.push(`/profile/${action.value.id}`)
    formikBag.setStatus({ success_message: 'Changes saved!' })
    return action
  }

  const load = id => isNumber(id) ? loadUser(id) : () => {}

  return (
    <Loader
      params={id}
      load={load}
      onLoading={setLoading}
    >
      {isLoading
        ? <Loading />
        : (
          <div className={classes.root}>
            <Form
              user={user}
              component={ProfileForm}
              onSubmit={submit}
            />
          </div>
        )}
    </Loader>
  )
}

ProfileScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    user: userShape,
    createUser: func.isRequired,
    updateUser: func.isRequired,
  })
}

const redux = (state, { match: { params } }) => ({
  user: state.users.entities[params.user_id],
  loadUser: actions.users.load,
  createUser: actions.users.create,
  updateUser: actions.users.update,
})

export default withStyles(styles)(connect(redux)(ProfileScene))
