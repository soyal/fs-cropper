import React, { Component } from 'react'
import Cropper from 'cropperjs'
import PropTypes from 'prop-types'

class ImageCropper extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // 图片url
    onInit: PropTypes.func.isRequired
  }

  imageDom = null // cropper 容器

  state = {
    imageUrl: '' // file转成的imageUrl
  }

  readFileAsUrl(file) {
    const reader = new FileReader()
    reader.onload = ({ target }) => {
      const base64 = target.result
      this.handleImageUrl(base64)
    }
    reader.readAsDataURL(file)
  }

  initCropper() {
    if (!this.imageDom) {
      throw new Error('裁剪工具容器没有初始化完成!')
    }

    const cropper = new Cropper(this.imageDom, {
      // aspectRatio: 1 / 1,
      preview: this.preview,
      modal: true,
      autoCrop: true,
      viewMode: 2,
      background: false,
      scalable: false, // 不允许延展
      zoomable: false // 不允许拉远拉进
    })

    this.props.onInit(cropper)
  }

  handleImageUrl(url) {
    this.setState(
      {
        imageUrl: url
      },
      () => {
        this.initCropper()
      }
    )
  }

  componentDidMount() {
    const { image } = this.props
    // 直接传入的是image url
    if (typeof image === 'string') {
      this.handleImageUrl(image)
      // 传入的file
    } else {
      this.readFileAsUrl(image)
    }
  }

  render() {
    const { imageUrl } = this.state

    return (
      <img
        src={imageUrl}
        alt=""
        style={{ maxWidth: '350px', maxHeight: '400px' }}
        ref={imageDom => {
          this.imageDom = imageDom
        }}
      />
    )
  }
}

export default ImageCropper
