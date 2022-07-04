const express = require('express')
const { ConsoleRouter } = require('./routes/consoles.routes')
const { GameRouter } = require('./routes/games.routes')
const { UserRouter } = require('./routes/users.routes')
const { User } = require('./models/users.model')
const { Review } = require('./models/reviews.model')
const { Game } = require('./models/games.model')
const { GamesInConsoles } = require('./models/gamesInconsoles.model')
const { Console } = require('./models/consoles.model')

const { globalErrorHandler } = require('./controllers/error.controller')
const app = express()

app.use(express.json())

app.use('/api/v1/consoles', ConsoleRouter)
app.use('/api/v1/games', GameRouter)
app.use('/api/v1/users', UserRouter)

User.hasMany(Review)
Game.hasMany(Review)
Game.belongsToMany(GamesInConsoles, { through: 'gameId' })
Console.belongsToMany(GamesInConsoles, { through: 'consoleId' })

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  )
})

app.use(globalErrorHandler)
module.exports = { app }
