// rollup.config.js
import { terser } from 'rollup-plugin-terser'

const name = "rgbLabConversion"

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'umd',
    name: name,
    sourcemap: true,
  }, {
    file: 'module/index.js',
    format: 'esm',
    name: name,
    sourcemap: true,
  }],
  plugins: [
    terser(),
  ]
}
