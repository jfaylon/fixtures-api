const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Tournament = require("./Tournament");
const Team = require("./Team");

const Fixture = sequelize.define(
  "Fixture",
  {
    tournamentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tournament,
        key: "id"
      }
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id"
      }
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: "id"
      }
    },
    matchDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    matchStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not Started",
      validate: {
        isIn: [
          [
            "Not Started",
            "1H",
            "HT",
            "2H",
            "FT",
            "ET 1H",
            "HT ET",
            "ET 2H",
            "FT AET",
          ],
        ],
      },
    },
    homeTeamScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    awayTeamScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    homeTeamPenaltyScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
    awayTeamPenaltyScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ["tournamentId", "matchDateTime"] },
      {
        fields: ["tournamentId", "matchDateTime", "homeTeamId", "awayTeamId"],
        unique: true,
      },
    ],
  }
);

Fixture.belongsTo(Tournament, { foreignKey: "tournamentId" });
Fixture.belongsTo(Team, { foreignKey: "homeTeamId", as: "homeTeam" });
Fixture.belongsTo(Team, { foreignKey: "awayTeamId", as: "awayTeam" });
module.exports = Fixture;
