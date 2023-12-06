const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
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
