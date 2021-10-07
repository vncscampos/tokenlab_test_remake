/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  bail: 1,
  clearMocks: true,

  collectCoverage: false,
  collectCoverageFrom: [
    'src/app/modules/**'
  ],
  coverageDirectory: '__tests__/coverage',
  coverageReporters: [
    'text',
    'lcov',
  ],

  testMatch: [
    '**/__tests__/**/*.test.ts',
  ],
};