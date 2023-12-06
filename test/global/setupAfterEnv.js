const sequelize = require("../../src/sequelize");
const { createTestFixtures } = require("../../src/seeds/seeds.script");

// Global setup before all tests
beforeAll(async () => {
  const isInMemoryDatabase = sequelize.options.storage === ":memory:";
  console.log(`in-memory: ${isInMemoryDatabase}`);
  await sequelize.sync();
  await createTestFixtures();
});

// Global teardown after all tests
afterAll(async () => {
  await sequelize.close();
});
