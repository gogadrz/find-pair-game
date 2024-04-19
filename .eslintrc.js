module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
  },
};
