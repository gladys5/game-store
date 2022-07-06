const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { User } = require('../models/users.model')
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/app.Error.util')
dotenv.config({ path: './config.env' })

//crear usuario
const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body
  //genSalt es un metodo que genera un string el numero de veces que le indiquemos
  const salt = await bcrypt.genSalt(12)
  //hash resive el texto que queremos encriptar y el numero  o en este caso un string para generar la contrasenia segura
  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    //para la columna password utiliza hasPassword
    password: hashPassword,
  })
  //no muestres la contrasenia
  newUser.password = undefined
  res.status(201).json({
    status: 'success',
    newUser,
  })
})

//obtener las cuentas de usuarios activos proteger jwt
const getUserActive = catchAsync(async (req, res, next) => {
  // const{user}=req
  const users = await User.findAll()

  // console.log(users)
  res.status(200).json({
    users,
  })
})

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  //validando que el usuario exista
  const user = await User.findOne({
    where: {
      email,
      status: 'active',
    },
  })

  //si no existe enviamos error
  if (!user) {
    return next(new AppError('Credentials invalid', 400))
  }

  // compare compara si lo que ingresa el usuario como contrasenia es lo mismo que en la bace de datos
  // resive 2 string el plano(password) y el encriptado(user.password)
  //luego compara que estos datos sean iguales
  const isPasswordValid = await bcrypt.compare(password, user.password)
  //si la contrasenia no es valida retorna error
  if (!isPasswordValid) {
    return next(new AppError('Credentials invalid', 400))
  }
  //sign resive un paylod(los datos adjuntos que queremos poner al token),un objeto{id:user.id}(el usuario al que le pertenese ese token)
  //tambien resive la firma(JWT_SECRET)
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //fecha de expiracion del token
    expiresIn: '30d',
  })
  console.log(token)
  res.status(200).json({
    status: 'success',
    token,
  })
})

//actualizar perfil de usuario proteger jwt
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req
  const { name, email } = req.body
  await user.update({ name, email })
  res.status(201).json({
    status: 'success',
  })
})
//desabilitar cuenta de usuario proteger jwt
const desabiliteUser = catchAsync(async (req, res, next) => {
  const { user } = req

  await user.update({ status: 'deleted' })

  res.status(204).json({ status: 'success' })
})

module.exports = {
  createUser,
  login,
  getUserActive,
  updateUser,
  desabiliteUser,
}
