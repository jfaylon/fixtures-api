const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Replace with the correct path to your Sequelize instance

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logoImageLink: {
    type: DataTypes.STRING,
    allowNull: true, // Change to false if you want it to be required
  },
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['name'] },
  ],
});

module.exports = Team;