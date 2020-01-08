module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'arrow-body-style': 0,
    'no-confusing-arrow': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/camelcase': [
      1,
      {
        ignoreDestructuring: true,
        properties: 'never',
      },
    ],
  },
  globals: {
    page: true,
    g_app: true,
  },
};
