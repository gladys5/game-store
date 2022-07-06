const express = require('express')

const {
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
} = require('../controllers/games.controllers')
const { gameExist } = require('../midellwares/gameExist.middleware')
const {
  protectSession,
  protectUserAccount,
} = require('../midellwares/auth.middleware')

const router = express.Router()
router.get('/', getAllGames)
router.use(protectSession)
router.post(
  '/reviews/:gameId',
  protectUserAccount,
  gameExist,
  writeReviewOfGame
)
router.post('/', protectUserAccount, createNewGame)
router.patch('/:id', protectUserAccount, updateTitleOfOneGame)
router.delete('/:id', protectUserAccount, desabiliteGame)
module.exports = { GameRouter: router }
