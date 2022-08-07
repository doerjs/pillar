module.exports = {
  extends: ['@doerjs/eslint-config'],
  globals: {
    HTMLElement: true,
    SVGElement: true,
  },
  rules: {
    'react/no-multi-comp': 'off',
  },
}
