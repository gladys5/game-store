const { User } = require('../models/users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/app.Error.util')
//crear usuario
const createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body
  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  })
  newUser.password = undefined
  res.status(201).json({
    status: 'success',
    newUser,
  })
})

//obtener las cuentas de usuarios activos proteger jwt
const getUserActive = catchAsync(async (req, res) => {
  const { user } = req
  const users = await User.findAll({ where: { status: 'active' } })
  res.status(200).json({
    users,
    user,
  })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email,
      status: 'active',
    },
  })

  if (!user) {
    return next(new AppError('Credentials invalid', 400))
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return next(new AppError('Credentials invalid', 400))
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({
    status: 'success',
    token,
  })
})

//actualizar perfil de usuario proteger jwt
const updateUser = catchAsync(async (req, res) => {
  const { user } = req
  const { id } = req.params
  const { name, email } = req.body
  const users = await User.findOne({ where: { id } })
  await users.update({ name, email })
  res.status(201).json({
    user,
    users,
  })
})
//desabilitar cuenta de usuario proteger jwt
const desabiliteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { id } })
  await user.update({ status: 'cancelled' })

  res.status(204).json({
    user,
  })
})

module.exports = {
  createUser,
  login,
  getUserActive,
  updateUser,
  desabiliteUser,
}
