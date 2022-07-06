const { app } = require('./app')

const { db } = require('./utils/db')
const { User } = require('./models/users.model')
const { Review } = require('./models/reviews.model')
const { Game } = require('./models/games.model')
const { GamesInConsoles } = require('./models/gamesInconsoles.model')
const { Console } = require('./models/consoles.model')
db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err))

User.hasMany(Review, { foreignKey: 'userId' })
Review.belongsTo(User)

Game.hasMany(Review, { foreignKey: 'gameId' })
Review.belongsTo(Game)

Game.belongsToMany(Console, {
  foreignKey: 'consoleId',
  through: 'gamesInConsole',
})
Console.belongsToMany(Game, {
  foreignKey: 'gameId',
  through: 'gamesInConsole',
})
db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`)
})
