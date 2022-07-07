const express = require('express')
const { ConsoleRouter } = require('./routes/consoles.routes')
const { GameRouter } = require('./routes/games.routes')
const { UserRouter } = require('./routes/users.routes')

const { globalErrorHandler } = require('./controllers/error.controller')
const { AppError } = require('./utils/app.Error.util')

const app = express()

app.use(express.json())

app.use('/api/v1/consoles', ConsoleRouter)
app.use('/api/v1/games', GameRouter)
app.use('/api/v1/users', UserRouter)
//all  no es de ningun methodo http, direcciona y carga las funciones de middleware para todos los objetos req ,esto lo hace utilizando vias de acceso de ruta que en este caso es "*" ,estas vias de acceso son subconjuntos de las expreciones regulares, express utiliza la libreria path-to-regexp para correlacionar estas rutas

app.all('*', (req, res, next) => {
  next(
    //req.method es el methodo http (get,post,path,delete),originalUrl es una propiedad que conserva la url de solicitud original lo que le permite reescribirla libremente en este caso eliminara su punto de montaje y se reescribira la ruta que indica app.use

    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  )
})
//app.use resive el path y el callback como argumentos,esta se ejecuta cuando la bace de la ruta coinside
app.use(globalErrorHandler)
module.exports = { app }
