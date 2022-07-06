const express = require('express')
const {
  createUser,
  login,
  getUserActive,
  updateUser,
  desabiliteUser,
} = require('../controllers/users.controllers')

const { userExists } = require('../midellwares/user.middleware')
const { createUserValidators } = require('../midellwares/validators.middleware')
const {
  protectUserAccount,
  protectSession,
} = require('../midellwares/auth.middleware')
const router = express.Router()
router.post('/signup', createUserValidators, createUser)
router.post('/login', login)
//todas las rutas por debajo estan protegidas
router.use(protectSession)
router.get('/', protectUserAccount, userExists, getUserActive)
router.patch('/:id', protectUserAccount, userExists, updateUser)
router.delete('/:id', protectUserAccount, userExists, desabiliteUser)
module.exports = { UserRouter: router }
