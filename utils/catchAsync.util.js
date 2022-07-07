//atrapamos cualquier error asyncrono
//resive la funcion del controlador esta funcion contiene los argumentos que nos pasa el router req,res,next el controlador los nesecita para funcionar por ende las retornamos, cada  controlador utiliza async esto hace que nuestra funcion sea asincrona y requiera retornar una respuesta  catch resive un callback que si trae un error mandara a llamar next
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err))
  }
}

module.exports = { catchAsync }
