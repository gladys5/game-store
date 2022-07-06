const { Game } = require('../models/games.model')
const { Review } = require('../models/reviews.model')
const { User } = require('../models/users.model')
const { Console } = require('../models/consoles.model')
const { catchAsync } = require('../utils/catchAsync.util')
const { GamesInConsoles } = require('../models/gamesInconsoles.model')

//crear un nuevo juego  proteger jwt
const createNewGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body
  const newGame = await Game.create({ title, genre })
  res.status(201).json({
    newGame,
  })
})

//obtener todos los juegos registrados (tambien consolas que esten disponibles,los juegos y las resenias que se an echo sobre el juego)
const getAllGames = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    include: Console,
    include: Review,
  })
  //incluir las resenias
  res.status(200).json({
    games,
  })
})

//actualizar el titulo de un juego proteger jwt
const updateTitleOfOneGame = catchAsync(async (req, res, next) => {
  const { game } = req
  const { title } = req.body
  await game.update({ game: title })

  res.status(204).json({
    status: 'success',
  })
})

//escribir resenia sobre un juego proteger jwt
const writeReviewOfGame = catchAsync(async (req, res, next) => {
  const { sessionUser, game } = req
  const { comment } = req.body
  const { gameId } = req.params

  const newComment = await Review.create({
    userId: sessionUser.id,
    gameId: game.id,
    comment,
  })

  res.status(201).json({
    newComment,
    game,
    status: 'success',
  })
})
//desabilitar juego proteger jwt
const desabiliteGame = catchAsync(async (req, res, next) => {
  const { game } = req
  await game.update({ status: 'cancelled' })
  res.status(204).json({
    status: 'success',
  })
})
const gameAddConsole = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body

  const gameInConsole = await GamesInConsoles.create({ gameId, consoleId })

  res.status(201).json({
    status: 'success',
    gameInConsole,
  })
})

module.exports = {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
  gameAddConsole,
}
