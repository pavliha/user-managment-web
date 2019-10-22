import React, { Component } from 'react'
import { object, arrayOf, string, func } from 'prop-types'
import { withStyles, List, Typography } from '@material-ui/core'
import { UserListItem } from 'components'
import { userShape } from 'shapes'
import classNames from 'classnames'
import isEmpty from 'lodash/isEmpty'

const styles = {
  root: {},
  caption: {
    color: 'rgba(0,0,0,0.9)',
    paddingLeft: 15,
  }
}

class UsersList extends Component {

  list = React.createRef()

  componentDidMount() {
    const list = this.list.current
    list.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    const list = this.list.current
    list.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = e => {
    const { onScrollBottom } = this.props
    requestAnimationFrame(async () => {
      const scrollY = e.target.scrollTop
      const isScrollingBottom = this.oldScroll < scrollY
      const scrollPosition = e.target.scrollHeight - e.target.scrollTop

      if (isScrollingBottom && scrollPosition < 1300) {
        onScrollBottom()
      }
      this.oldScroll = scrollY
    })
  }

  render() {
    const { classes, className, users } = this.props

    const tempUsers = users.filter(user => user.token)
    const createdUsers = users.filter(user => !user.token)
    const isTempCaptionVisible = !isEmpty(tempUsers)
    const isCreatedCaptionVisible = !isEmpty(createdUsers) && !isEmpty(tempUsers)

    return (
      <List ref={this.list} className={classNames([classes.root, className])}>
        {isTempCaptionVisible && (
          <Typography
            className={classes.caption}
            gutterBottom
            variant="caption"
          >
            Awaiting completion
          </Typography>
        )}
        {tempUsers.map(user => <UserListItem key={user.id} user={user} />)}
        {isCreatedCaptionVisible && (
          <Typography
            className={classes.caption}
            gutterBottom
            variant="caption"
          >
            Created users
          </Typography>
        )}
        {users.filter(user => !user.token).map(user => <UserListItem key={user.id} user={user} />)}
      </List>
    )
  }
}

UsersList.propTypes = {
  classes: object.isRequired,
  className: string,
  users: arrayOf(userShape),
  onScrollBottom: func,
}

export default withStyles(styles)(UsersList)
