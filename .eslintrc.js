module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'arrow-body-style': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    'import/extensions': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'prefer-object-spread': 'off',
    'prefer-template': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 'off',

    // TODO: Remove when fixed
    'import/no-cycle': 'off',
    'no-console': 'off'
  }
};
