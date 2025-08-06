module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-common'],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'declaration-no-important': null,
    'selector-max-id': 10,
  },
};