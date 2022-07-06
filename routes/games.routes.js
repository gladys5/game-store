const express = require('express')

const {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
} = require('../controllers/games.controllers')
const { gameExist } = require('../midellwares/gameExist.middleware')
const router = express.Router()
router.post('/reviews/:gameId', gameExist, writeReviewOfGame)

router.post('/', createNewGame)
router.get('/', getAllGames)
router.patch('/:id', updateTitleOfOneGame)
router.delete('/:id', desabiliteGame)
module.exports = { GameRouter: router }
