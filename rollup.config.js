import json from '@rollup/plugin-json'
import css from 'rollup-plugin-css-only'

const sharedPlugins = [json()]

export default [
  {
    input: 'app/index.js',
    output: { file: 'dist/index.js' },
    plugins: [css({ output: 'index.css' }), ...sharedPlugins],
  },
  {
    input: 'app/paint-worklets/quadratic-curve.js',
    output: {
      file: 'dist/paint-worklets/quadratic-curve.js',
      format: 'iife',
    },
    plugins: sharedPlugins,
  },
  {
    input: 'app/paint-worklets/spiral.js',
    output: {
      file: 'dist/paint-worklets/spiral.js',
      format: 'iife',
    },
    plugins: sharedPlugins,
  },
]
