module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test/global/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/test/global/setupAfterEnv.js"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/docs", "<rootDir>/src/seeds"],
  collectCoverage: true,
};
