const { Sequelize } = require("sequelize");

const { MYSQL_DB_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, NODE_ENV } =
  process.env;

const environments = {
  development: {
    dialect: "mysql",
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    logging: true,
  },
  test: {
    // removing it as there are compatibility issues
    // like functions that are not available in either sqlite or mysql
    // dialect: "sqlite",
    // storage: ":memory:", // Use an in-memory database for testing
    // logging: false,

    dialect: "mysql",
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    logging: false,
  },
  production: {
    dialect: "mysql",
    host: MYSQL_HOST,
    port: 3306,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    logging: false, // Set to true to log SQL queries to the console
  },
};

const sequelize = new Sequelize(
  environments[NODE_ENV] || environments.development
);

module.exports = sequelize;
