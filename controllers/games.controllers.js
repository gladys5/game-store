const { Game } = require('../models/games.model')
const { Review } = require('../models/reviews.model')
const { GamesInConsole } = require('../models/gamesInconsoles.model')
const { catchAsync } = require('../utils/catchAsync.util')
//crear un nuevo juego  proteger jwt
const createNewGame = async (req, res) => {
  const { title, genre } = req.body
  const newGame = await Game.create({ title, genre })
  res.status(201).json({
    newGame,
  })
}

//obtener todos los juegos registrados (tambien consolas que esten disponibles,los juegos y las resenias que se an echo sobre el juego)
const getAllGames = async (req, res) => {
  const games = await Game.findAll()
  //incluir las resenias
  res.status(200).json({
    games,
  })
}

//actualizar el titulo de un juego proteger jwt
const updateTitleOfOneGame = async (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const games = await Game.findOne({
    where: { id },
  })
  await games.update({ title })

  res.status(201).json({
    games,
  })
}

//escribir resenia sobre un juego proteger jwt
const writeReviewOfGame = async (req, res) => {
  const { comment } = req.body

  const newComment = await Game.create({
    comment,
  })

  res.status(201).json({
    newComment,
  })
}

//desabilitar juego proteger jwt
const desabiliteGame = async (req, res) => {
  const { id } = req.params
  const games = await Game.findOne({ where: { id } })
  await games.update({ status: 'cancelled' })
  res.status(200).json({
    games,
  })
}

module.exports = {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
}
