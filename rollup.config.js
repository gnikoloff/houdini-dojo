import json from '@rollup/plugin-json'
import css from 'rollup-plugin-css-only'

import DEMOS_DESCRIPTIONS from './demos-descriptions.json'

const sharedPlugins = [json()]

export default [
  {
    input: 'app/index.js',
    output: { file: 'dist/index.js' },
    plugins: [css({ output: 'index.css' }), ...sharedPlugins],
  },
  ...DEMOS_DESCRIPTIONS.map(({ id }) => ({
    input: `app/paint-worklets/${id}.js`,
    output: {
      file: `dist/paint-worklets/${id}.js`,
      format: 'iife',
    },
    plugins: sharedPlugins,
  })),
]
