const { DataTypes } = require('sequelize')

const { db } = require('../utils/db')

const GamesInConsoles = db.define('gamesInConsole', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active',
  },
})

module.exports = { GamesInConsoles }
