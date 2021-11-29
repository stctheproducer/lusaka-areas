/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // tells Jest to handle `*.vue` files
    'vue',
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    '^.+\\.vue$': 'vue-jest',
    // process `*.js` files with `babel-jest`
    '.*\\.(ts)$': 'babel-jest',
  },
  rootDir: './src',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
  setupFiles: ['./setupTests'],
  setupFilesAfterEnv: ['../jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: false,
}

// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest',
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//   },
//   rootDir: './src',
//   testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
//   setupFilesAfterEnv: ['../jest.setup.js'],
// }
