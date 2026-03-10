import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/weathersense-card.js',
  output: {
    file: 'dist/weathersense-card.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    !dev && terser({ format: { comments: false } }),
  ],
};
