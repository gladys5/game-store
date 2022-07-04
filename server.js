const { app } = require('./app')

const { db } = require('./utils/db')
// const { User } = require('./models/user.model')
//const { Task } = require('./models/task.model')

db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((err) => console.log(err))

db.sync()
  .then(() => console.log('Database sync'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`)
})
