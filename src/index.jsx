import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button, Modal } from '@fs/cc-ui'
import PropTypes from 'prop-types'

import './index.less'

class FsCropper extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    width: PropTypes.number, // 裁剪区域宽度
    height: PropTypes.number, // 裁剪区域高度
    borderRadius: PropTypes.number, // border radius
    title: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired, // 关闭的回调 (): void
    onConfirm: PropTypes.func.isRequired // 确认的回调 (base64: string): Promise, resolve后则停止loading
  }

  static defaultProps = {
    image: '',
    width: 250,
    height: 250,
    borderRadius: 0,
    title: '图片裁剪',
    show: false
  }

  cropper = null // 裁剪框的dom对象

  _onConfirm = async () => {
    const canvas = this.cropper.getImage()
    await this.props.onConfirm(canvas.toDataURL())
  }

  render() {
    const {
      image,
      width,
      height,
      borderRadius,
      show,
      title,
      onClose
    } = this.props

    return (
      <Modal
        title={title}
        show={show}
        contentStyle={{
          padding: 0
        }}
        onClose={onClose}
      >
        <div className="fs-cropper">
          <div className="fs-cropper_crop">
            <AvatarEditor
              ref={dom => (this.cropper = dom)}
              image={image}
              width={width}
              height={height}
              borderRadius={borderRadius}
              color={[0, 0, 0, 0.3]} // RGBA
              rotate={0}
              border={25}
            />
          </div>

          <div className="fs-cropper_btns">
            <Button className="fs-cropper_btn" size="medium" onClick={onClose}>
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
      </Modal>
    )
  }
}

export default FsCropper
