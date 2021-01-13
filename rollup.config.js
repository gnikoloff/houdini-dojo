import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'

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
    }),
    css({ output: 'index.css' })
  ]
}