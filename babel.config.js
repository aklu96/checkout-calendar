/* eslint-disable */

module.exports = {
  plugins: ['babel-plugin-styled-components'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
};