module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test/global/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/test/global/setupAfterEnv.js"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/docs",
    "<rootDir>/src/seeds",
    "<rootDir>/src/app.js",
    "<rootDir>/src/index.js",
    "<rootDir>/src/swaggerConfig.js",
    "<rootDir>/src/sequelize.js",
  ],
  collectCoverage: true,
};
