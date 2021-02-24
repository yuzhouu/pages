const rollup = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const path = require('path')

async function build() {
  const bundle = await rollup.rollup({
    input: path.resolve(__dirname, './src/index.tsx'),
    external: (id) => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        module: 'ESNext',
      }),
      resolve(),
      commonjs(),
    ],
  })

  await bundle.write({
    // file: path.resolve(__dirname, './dist/index.js'),
    dir: path.resolve(__dirname, './dist'),
    exports: 'auto',
    format: 'cjs',
    sourcemap: true,
  })

  await bundle.close()
}

build()
