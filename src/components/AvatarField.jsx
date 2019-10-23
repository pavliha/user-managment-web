import React, { Component } from 'react'
import { object, string, func } from 'prop-types'
import api from 'api'
import { withStyles } from '@material-ui/core'
import transformValidationApi from 'utils/transformValidationApi'
import { ServerMessage } from 'components'

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },

  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },

  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 300,
    height: 300,
  },

  img: {
    backgroundSize: 'cover',
    height: 300,
    width: 300,
  }
}

class AvatarField extends Component {
  fileInput = React.createRef()

  state = {
    loading: 0,
    url: '',
  }

  handleFileInput = e =>
    this.uploadFile(e.target.files[0])

  setError = (error) => {
    const { onError } = this.props
    if (!error) return onError(null)
    const { file, url, non_field_error } = transformValidationApi(error)
    onError(non_field_error || file || url)
  }

  clickFileInput = () =>
    this.fileInput.current.click()

  watchProgress = (progress) =>
    this.setState({ loading: progress === 100 ? 0 : progress })

  uploadFile = async file => {
    if (file) this.upload(() => api.asset.create(file, this.watchProgress))
  }

  upload = async (callback) => {
    const { name, onChange } = this.props
    try {
      const asset = await callback()
      this.setState({ url: '' })
      onChange(name, asset.url)
    } catch (error) {
      this.setError(error)
    }
  }

  render() {
    const { classes, name, value: avatar_url } = this.props

    return (
      <div className={classes.root} onClick={this.clickFileInput}>
        <div className={classes.container}>
          {avatar_url && <div style={{ backgroundImage: `url('${avatar_url}')` }} className={classes.img} />}
        </div>
        <ServerMessage color="error" name={name} />
        <input
          ref={this.fileInput}
          accept="image/*"
          className={classes.fileInput}
          id="upload-avatar"
          multiple
          type="file"
          onChange={this.handleFileInput}
        />
      </div>
    )
  }
}

AvatarField.propTypes = {
  classes: object.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  onError: func,
}

export default withStyles(styles)(AvatarField)
