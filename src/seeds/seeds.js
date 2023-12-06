require("dotenv").config();
const sequelize = require("../sequelize");
// us
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");
const Fixture = require("../models/Fixture");
const { createTestFixtures } = require("./seeds.script");
const { Sequelize } = require("sequelize");

const { MYSQL_DB_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST } =
  process.env;

const createDatabase = async () => {
  const db = new Sequelize(
    `mysql://${MYSQL_USERNAME}:${MYSQL_PASSWORD}@${MYSQL_HOST}`,
    {
      dialect: "mysql",
    }
  );
  const databaseName = MYSQL_DB_NAME;
  await db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`);
};

(async () => {
  await createDatabase();
  await Team.sync({ alter: true });
  await Tournament.sync({ alter: true });
  await Fixture.sync({ alter: true });
  const result = await createTestFixtures();
  console.log("fixtures created");
  process.exit(0);
})();
