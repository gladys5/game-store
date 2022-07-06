const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Models
const { User } = require('../models/users.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.util')
const { AppError } = require('../utils/app.Error.util')
//firmas
dotenv.config({ path: './config.env' })

const protectSession = catchAsync(async (req, res, next) => {
  let token

  if (
    //(req) contiene la informacion de la peticion con el cual queremos examinar el header.authorization
    req.headers.authorization &&
    //solo si el header.authorization (startsWith)empieza con Bearer
    req.headers.authorization.startsWith('Bearer')
  ) {
    //retiramos el espacio que existe entre Bearer y el token
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Invalid session', 403))
  }
  //verify resive el token que queremos validar y la firma
  //nos regresa el id del usuario, iat: que es la fecha de expiracion y de inicio
  const decoded = await jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findOne({
    //buscamos al usuario
    where: { id: decoded.id, status: 'active' },
  })

  if (!user) {
    return next(
      new AppError('The owner of this token doesnt exist anymore', 403)
    )
  }
  //adjuntamos la informacion de el usuario que encontramos al objeto de la peticion
  req.sessionUser = user
  next()
})

const protectUserAccount = (req, res, next) => {
  //desestructuramos para saber si es el mismo
  const { sessionUser, user } = req

  if (sessionUser.id !== user.id) {
    return next(new AppError('You do not own this account', 403))
  }

  next()
}

module.exports = { protectSession, protectUserAccount }
