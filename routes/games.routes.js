const express = require('express')

const {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
} = require('../controllers/games.controllers')

const router = express.Router()
router.post('/', createNewGame)
router.post('/reviews/:gameId', writeReviewOfGame)
router.get('/', getAllGames)
router.patch('/:id', updateTitleOfOneGame)
router.delete('/:id', desabiliteGame)
module.exports = { GameRouter: router }
