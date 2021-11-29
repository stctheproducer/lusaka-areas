module.exports = {
  env: {
    jest: true,
  },
  plugins: ['jest'],
  extends: ['@antfu', 'prettier'],
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
