module.exports = {
  externals: [
    'react',
    'react-dom',
    {
      regexp: /^@fs\/cc-ui/,
      module: 'commonjs'
    },
    'prop-types',
    'cropperjs'
  ]
}
