import copy from 'rollup-plugin-copy'

export default {
  input: [
    'app/index.js',
    'app/paint-worklets/bezier-curves.js'
  ],
  output: {
    dir: 'dist',
    preserveModules: true
  },
  plugins: [
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' }
      ]
    })
  ]
}