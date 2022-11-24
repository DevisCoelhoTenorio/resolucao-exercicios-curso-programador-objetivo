/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './tests',
  modulePathIgnorePatterns: [
    '<rootDir>/utils',
    '<rootDir>/sources',
    '<rootDir>/setup.js',
    '<rootDir>/testSequencer.js',
  ],
  testTimeout: 60000,
};