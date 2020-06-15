module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  globalSetup: '<rootDir>/src/testSetup/callSetup.ts',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
