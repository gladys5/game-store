const { app } = require('./app')

const { db } = require('./utils/db')
const { User } = require('./models/users.model')
const { Review } = require('./models/reviews.model')
const { Game } = require('./models/games.model')
const { Console } = require('./models/consoles.model')
db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err))
//la asociacion hasMany solo tiene una opcion buscar y bincular una variable (llave Primaria)dentro del modelo que tenga id en su nombre ejemplo:userId ,foreignKey es la forma en la que le decimos a sequelize que lo que esta asu lado derecho es la llave primaria que busca,cuando la encuentra se genera un llamado a sync()esto es necesario ya que hasMany tiene un valor inicial de null

User.hasMany(Review, { foreignKey: 'userId' })
Review.belongsTo(User)
//belongsTo crea una asociacion origen destino

Game.hasMany(Review, { foreignKey: 'gameId' })
Review.belongsTo(Game)

Game.belongsToMany(Console, {
  through: 'gamesInConsole',
})
Console.belongsToMany(Game, {
  through: 'gamesInConsole',
})
//sync sincroniza automaticamente todos los modelos,crea la tabla si no existe y no hace nada si esta presente
db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 5001
//listen se usa para vincular y escuchar las conexiones en el host y el puerto especificados.si el # de puerto es 0 el sistema operativo otorga un nuevo puerto arbitrario no utilizado (es una devolucion de llamada para manejar las solicitudes)

app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`)
})
