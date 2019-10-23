module.exports = {
  extends: ['standard', 'standard-react'],
  plugins: ['react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'camelcase': 0,
    'generator-star-spacing': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {},
  globals: {
    'isServer': true,
    'isClient': true,
    'store': true,
  },
  env: {
    'jasmine': true,
    'jest': true,
    'browser': true,
    'node': true,
  },
}
