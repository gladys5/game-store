const { Console } = require('../models/consoles.model')
//crear un nuevo juego proteger jwt
const createGame = async (req, res) => {
  const { name, company } = req.body
  const newConsole = await Console.create({ name, company })
  res.status(201).json({
    newConsole,
  })
}
//obtener todas las consolas registradas (traer los juegos que esten disponibles para dicha consola)
const getConsolesRegistereds = async (req, res) => {
  const consoles = await Console.findAll()
  //traer juegos disponibles
  res.status(200).json({
    consoles,
  })
}

//actualiza el titulo de la consola proteger jwt
const updateConsoleTitle = async (req, res) => {
  const { name } = req.body
  const { id } = req.params
  const consoles = await Console.findOne({ where: { id } })
  await consoles.update({ name })
  res.status(200).json({
    consoles,
  })
}
//desabilita la consola proteger jwt
const desabiliteConsole = async (req, res) => {
  const { id } = req.params
  const consoles = await Console.findOne({ where: { id } })
  await consoles.update({ status: 'cancelled' })
  res.status(200).json({
    consoles,
  })
}

module.exports = {
  createGame,
  getConsolesRegistereds,
  updateConsoleTitle,
  desabiliteConsole,
}
