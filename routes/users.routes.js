const express = require('express')
const {
  createUser,
  login,
  getUserActive,
  updateUser,
  desabiliteUser,
} = require('../controllers/users.controllers')

const router = express.Router()
router.post('/signup', createUser)
router.post('/login', login)
router.get('/', getUserActive)
router.patch('/:id', updateUser)
router.delete('/:id', desabiliteUser)
module.exports = { UserRouter: router }
