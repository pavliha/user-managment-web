import React, { Component } from 'react'
import { func, node, object, any } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import ErrorIcon from 'mdi-react/ErrorIcon'
import isEqual from 'lodash/isEqual'

const styles = theme => ({

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    width: 100,
    height: 100,
    color: theme.palette.error.main
  }
})

class Loader extends Component {

  state = {
    error: null,
  }

  async componentDidMount() {
    const { params } = this.props
    await this.load(params)
  }

  async shouldComponentUpdate(next) {
    const prev = this.props
    if (isEqual(prev.params, next.params)) return

    await this.load(next.params)
  }

  load = async (params) => {
    const { load, onError, onLoad, onLoading } = this.props
    try {
      onLoading(true)
      const result = await load(params)
      onLoading(false)
      onLoad(result)
    } catch (error) {
      this.setState({ error })
      onError(error)
    }
  }

  render() {
    const { classes, children } = this.props
    const { error } = this.state

    if (error) {
      return (
        <div className={classes.loading}>
          <div className={classes.errorContainer}>
            <ErrorIcon className={classes.error} />
            <Typography color="textSecondary">{error.message}</Typography>
            <Typography color="textSecondary">{error.error?.message}</Typography>
          </div>
        </div>
      )
    }

    return children
  }
}

Loader.propTypes = {
  classes: object.isRequired,
  params: any,
  load: func.isRequired,
  children: node,
  onLoading: func,
  onLoad: func,
  onError: func,
}

Loader.defaultProps = {
  onLoad: () => {},
  onError: () => {}
}

export default withStyles(styles)(Loader)
