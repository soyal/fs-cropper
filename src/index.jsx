import React, { Component } from 'react'
import { Button, Modal, Spin } from '@fs/cc-ui'
import ImageCropper from './cropper'
import PropTypes from 'prop-types'
import 'cropperjs/dist/cropper.css'
import './index.less'

class FsCropper extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // 显示的图片url
    title: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired, // 关闭的回调 (): void
    onConfirm: PropTypes.func.isRequired // 确认的回调 (base64: string, canvas: Canvas): Promise, resolve后则停止loading
  }

  static defaultProps = {
    image: '',
    title: '图片裁剪',
    show: false
  }

  cropper = null // 裁剪实例

  state = {
    loading: false // 是否显示spin
  }

  showSpin() {
    this.setState({
      loading: true
    })
  }

  hideSpin() {
    this.setState({
      loading: false
    })
  }

  onCropperInit = cropper => {
    this.cropper = cropper
  }

  _onConfirm = async () => {
    const canvas = this.cropper.getCroppedCanvas()
    this.showSpin()
    await this.props.onConfirm(canvas.toDataURL(), canvas)
    this.hideSpin()
  }

  render() {
    const { image, show, title, onClose } = this.props

    return (
      <Modal
        title={title}
        show={show}
        contentStyle={{
          padding: 0
        }}
        onClose={onClose}
      >
        <Spin show={this.state.loading}>
          <div className="fs-cropper">
            <div className="fs-cropper_crop">
              <ImageCropper image={image} onInit={this.onCropperInit} />
            </div>

            <div className="fs-cropper_btns">
              <Button
                className="fs-cropper_btn"
                size="medium"
                onClick={onClose}
              >
                取消
              </Button>
              <Button
                type="primary"
                size="medium"
                className="fs-cropper_btn"
                onClick={this._onConfirm}
              >
                确认
              </Button>
            </div>
          </div>
        </Spin>
      </Modal>
    )
  }
}

export default FsCropper
