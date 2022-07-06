const express = require('express')

const {
  createGame,
  getConsolesRegistereds,
  updateConsoleTitle,
  desabiliteConsole,
} = require('../controllers/consoles.controllers')
const { protectSession } = require('../midellwares/auth.middleware')
const router = express.Router()
router.get('/', getConsolesRegistereds)
router.use(protectSession)
router.post('/', createGame)
router.patch('/:id', updateConsoleTitle)
router.delete('/:id', desabiliteConsole)

module.exports = { ConsoleRouter: router }
