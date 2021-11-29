// const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // root: true,
  env: {
    // node: true,
    jest: true,
  },
  // parserOptions: {
  //   ecmaVersion: 2020,
  // },
  plugins: ['jest'],
  extends: [
    // 'plugin:vue/vue3-essential',
    // '@vue/standard',
    // '@vue/typescript/recommended',
    '@antfu',
    'prettier',
  ],
  rules: {
    'no-console': isProd ? 'warn' : 'off',
    //   'no-debugger': isProd ? 'warn' : 'off',
    //   'no-unused-vars': isDev ? 'off' : 'warn',
    //   'vue/no-unused-vars': isDev ? 'off' : 'warn',
    //   'space-before-function-paren': ['error', 'never'],
    //   'comma-dangle': ['error', 'only-multiline'],
    //   'no-undef': isDev ? 'off' : 'warn',
    //   'no-unreachable': isDev ? 'off' : 'warn',
    // '@typescript-eslint/no-explicit-any': 'off',
    // 'space-before-function-paren': 'off',
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
