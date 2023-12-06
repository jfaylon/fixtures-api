const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "test.env"),
  override: true,
});
const { Sequelize } = require("sequelize");
const sequelize = require("../../src/sequelize");
const Team = require("../../src/models/Team");
const Tournament = require("../../src/models/Tournament");
const Fixture = require("../../src/models/Fixture");
const { createTestFixtures } = require("../../src/seeds/seeds.script");

const { MYSQL_DB_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST } =
  process.env;

const databaseName = MYSQL_DB_NAME;

const createDatabase = async () => {
  const db = new Sequelize(
    `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}`,
    {
      dialect: "mysql",
    }
  );
  console.log(`Creating database ${databaseName}`);
  await db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
};
// Global setup before all tests
beforeAll(async () => {
  try {
    const isInMemoryDatabase = sequelize.options.storage === ":memory:";
    console.log(`in-memory: ${isInMemoryDatabase}`);
    await createDatabase();
    await sequelize.sync();
    await createTestFixtures();
  } catch (error) {
    console.log(error);
  }
});

// Global teardown after all tests
afterAll(async () => {
  await sequelize.query(`DROP DATABASE IF EXISTS ${databaseName}`);
  await sequelize.close();
});
