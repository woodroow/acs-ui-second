module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb','plugin:flowtype/recommended'],
  plugins: ['react', 'jsx-a11y', 'flowtype'],
  env: {
    mocha: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    expect: true,
    shallow: true,
    mount: true
  },
  rules:{
    'import/no-cycle': 0,
    "linebreak-style": 0,
    'comma-dangle': [2, 'never'],
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'arrow-parens': ['error', 'as-needed'],
    'global-require': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'jsx-a11y/anchor-has-content': 0,
    'react/require-default-props': 0,
    'no-return-await': 0,
    'max-len': [1, 300],
    'no-shadow': 0,
    'react/button-has-type': 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'jsx-a11y/label-has-for': [ 2, {
      'required': {
        'every': [ 'nesting' ]
      },
      'allowChildren': true
    }],
    'jsx-a11y/label-has-associated-control': [ 2, {
      'depth': 1,
    }],
  }
};