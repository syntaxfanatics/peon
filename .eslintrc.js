module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:node/recommended', // https://github.com/mysticatea/eslint-plugin-node#readme
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-console': 'warn',
    'quotes': ['error', 'single',],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'no-trailing-spaces': ['error'],
  },
};
