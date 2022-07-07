const { Console } = require('../models/consoles.model')
const { catchAsync } = require('../utils/catchAsync.util')

//crear un nuevo juego proteger jwt
const createGame = catchAsync(async (req, res, next) => {
  const { name, company } = req.body
  const newConsole = await Console.create({ name, company })
  res.status(201).json({
    newConsole,
  })
})
//obtener todas las consolas registradas (traer los juegos que esten disponibles para dicha consola)
const getConsolesRegistereds = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll()
  res.status(200).json({
    consoles,
  })
})

//actualiza el titulo de la consola proteger jwt
const updateConsoleTitle = catchAsync(async (req, res, next) => {
  const { title } = req.body
  const { id } = req.params
  const consoles = await Console.findOne({ where: { id } })
  await consoles.update({ title })
  res.status(200).json({
    consoles,
  })
})
//desabilita la consola proteger jwt
const desabiliteConsole = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const consoles = await Console.findOne({ where: { id } })
  await consoles.update({ status: 'cancelled' })
  res.status(200).json({
    consoles,
  })
})

module.exports = {
  createGame,
  getConsolesRegistereds,
  updateConsoleTitle,
  desabiliteConsole,
}
