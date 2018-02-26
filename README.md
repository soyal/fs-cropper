## 图片裁剪工具
一个剪切图片的弹窗
## 查看demo
git clone
```
npm install --registry=http://npm.fishsaying.com
npm run storybook
```

## Quick start

```javascript
import Cropper from '@fs/fs-cropper'

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
```

## props
* image: String || File, 要裁剪的目标图片，可以是File文件或者url
* width: Numer, 裁剪区域宽度
* height: Number, 裁剪区域高度
* borderRadius: Number, 裁剪区域border radius，如果想设置矩形则为0，圆形为width或者height的一半
* title: String, 弹窗的标题
* show: Boolean, 是否显示弹窗
* onClose: Function, 关闭弹窗的回调
* onConfirm: Function, (base64:string): Promise,确认裁剪的回调，为了方便异步操作，需要返回Promise，当Promise为resolve状态时，loading关闭

## License
[MIT](./LICENSE)