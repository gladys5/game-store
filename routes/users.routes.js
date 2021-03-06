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
router.get('/', getUserActive)
router.patch('/:id', userExists, protectUserAccount, updateUser)
router.delete('/:id', userExists, protectUserAccount, desabiliteUser)
module.exports = { UserRouter: router }
