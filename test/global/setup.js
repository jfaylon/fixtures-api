const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "test.env"),
  override: true,
});

