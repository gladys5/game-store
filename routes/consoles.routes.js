const express = require('express')

const {
  createGame,
  getConsolesRegistereds,
  updateConsoleTitle,
  desabiliteConsole,
} = require('../controllers/consoles.controllers')
const router = express.Router()
router.post('/', createGame)
router.get('/', getConsolesRegistereds)
router.patch('/:id', updateConsoleTitle)
router.delete('/:id', desabiliteConsole)

module.exports = { ConsoleRouter: router }
