//Error personalizado
//Error es un constructor del objeto Error en javascrip
class AppError extends Error {
  //message es una propiedad del objeto error ,statusCode hace referencia al codigo de estado ejemplo  status(400)
  constructor(message, statusCode) {
    //methodo super es una palabra reservada para  acceder y llamar funciones del objeto padre  en este caso message
    super(message)
    //this.message ase referencia a la clase AppError al igualarla a message la estamos pasando por un parametro lo mismo para statusCode
    this.message = message
    this.statusCode = statusCode
    //el methodo startWith resive un string  en este caso 5 con esto le decimos que si encuentra un statusCode que empieze con 5 (500)sera error nuestro portanto informamos con la palabra "fail" si el statusCode es otro numero ejemplo(403)enviamos "error" que significa que fue error del cliente
    this.status = `${statusCode}`.startsWith('5') ? 'fail' : 'error'
    Error.captureStackTrace(this, this.constructor)
    //captureStackTrace() es un methodo estatico que crea la( stack) propiedad que es una instancia del error regresa un rastro de que funciones fueron llamadas desde que linea y archivo y con que argumentos desde la mas recientes hasta las anteriores lo que lleva de regreso  ala llamada de alcanse global originalpor esto requiere  de this(existen advertencias sobre su uso en produccion)
  }
}
module.exports = { AppError }
