/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  bail: true,
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "v8",
  testMatch: ["<rootDir>/useCases/**/**/*.test.ts"],
};
