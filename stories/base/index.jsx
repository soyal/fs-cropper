import React, { Component } from 'react'
import Cropper from '../../src/index'

class Demo extends Component {
  state = {
    show: false,
    previewUrl: '',
    image: null
  }

  render() {
    const { show, previewUrl } = this.state

    return (
      <div>
        <input
          type="file"
          onChange={e => {
            this.setState({
              image: e.target.files[0],
              show: true
            })
          }}
        />
        <div>
          <h2>裁剪部分的展示</h2>
          {previewUrl ? <img src={previewUrl} alt="预览图" /> : null}
        </div>

        <Cropper
          image={this.state.image}
          show={show}
          title="自定义标题"
          onClose={() => {
            this.setState({
              show: false
            })
          }}
          onConfirm={base64 => {
            return new Promise(resolve => {
              this.setState({
                previewUrl: base64,
                show: false
              })
              resolve()
            })
          }}
        />
      </div>
    )
  }
}

export default Demo
