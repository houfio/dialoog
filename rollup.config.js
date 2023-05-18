import { createRequire } from 'node:module';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const require = createRequire(import.meta.url);
const { main, module, peerDependencies, devDependencies } = require('./package.json');

export default {
  input: './src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(peerDependencies),
    ...Object.keys(devDependencies)
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
};
