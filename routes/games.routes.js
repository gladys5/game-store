const express = require('express')

const {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
  gameAddConsole,
} = require('../controllers/games.controllers')
const { gameExist } = require('../midellwares/gameExist.middleware')
const { protectSession } = require('../midellwares/auth.middleware')

const router = express.Router()

router.get('/', getAllGames)
router.use(protectSession)
router.post('/', createNewGame)
router.post('/gameAddConsole', gameAddConsole)
router.post('/reviews/:gameId', gameExist, writeReviewOfGame)
router.patch('/:id', updateTitleOfOneGame)
router.delete('/:id', desabiliteGame)
module.exports = { GameRouter: router }
