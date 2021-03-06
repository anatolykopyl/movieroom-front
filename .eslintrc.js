module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [['@', './src/']],
  //       extensions: ['.js', '.ts', '.vue'],
  //     },
  //     "node": {
  //       "paths": ["src"]
  //     }, 
  //   },
  // },
};
