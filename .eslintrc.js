module.exports = {
  env: {
    es6: false,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['error'],
    'max-len': [
      2,
      130,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
      },
    ],
  },
};
