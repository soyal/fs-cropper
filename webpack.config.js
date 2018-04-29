const path = require('path')
const autoprefixer = require('autoprefixer')
const config = require('./config')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    library: '@fs/fs-cropper',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },

          {
            loader: require.resolve('less-loader')
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'source-map',

  externals: _externals()
}

function _externals() {
  const exs = {}
  const result = [exs]
  config.externals.forEach(ex => {
    if (typeof ex === 'object') {
      result.push((context, request, cb) => {
        const pattern = ex.regexp
        if (pattern.test(request)) {
          return cb(null, ex.module + ' ' + request)
        }
        cb()
      })
    } else {
      exs[ex] = {
        commonjs: ex,
        commonjs2: ex
      }
    }
  })

  return result
}
