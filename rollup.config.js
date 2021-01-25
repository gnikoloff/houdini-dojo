import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'
import css from 'rollup-plugin-css-only'
import copy from 'rollup-plugin-copy'
import cleanup from 'rollup-plugin-cleanup'

import DEMOS_DESCRIPTIONS from './demos-descriptions.json'

const sharedPlugins = [resolve(), commonjs(), json(), !process.env.ROLLUP_WATCH && cleanup()].filter(Boolean)

export default [
  {
    input: 'app/index.js',
    output: { file: 'dist/index.js' },
    plugins: [css({ output: 'index.css' }), ...sharedPlugins],
  },
  ...DEMOS_DESCRIPTIONS.map(({ id }) => ({
    input: `app/paint-worklets/${id}/index.js`,
    output: {
      file: `dist/paint-worklets/${id}/index.js`,
      format: 'iife',
    },
    plugins: [
      ...sharedPlugins,
      copy({
        targets: [{ src: `app/paint-worklets/${id}/package.json`, dest: `dist/paint-worklets/${id}` }],
      }),
    ],
  })),
]
