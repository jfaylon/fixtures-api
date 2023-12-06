const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Replace with the correct path to your Sequelize instance
const Tournament = sequelize.define(
  "Tournament",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [{ unique: true, fields: ["name"] }],
  }
);

module.exports = Tournament;
