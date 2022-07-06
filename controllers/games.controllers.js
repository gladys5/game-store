const { Game } = require("../models/games.model");
const { Review } = require("../models/reviews.model");
const { User } = require("../models/users.model");
const { Console } = require("../models/consoles.model");
const { catchAsync } = require("../utils/catchAsync.util");
const { GamesInConsoles } = require("../models/gamesInconsoles.model");
const { AppError } = require("../utils/app.Error.util");

//crear un nuevo juego  proteger jwt
const createNewGame = async (req, res) => {
  const { title, genre } = req.body;
  const newGame = await Game.create({ title, genre });
  res.status(201).json({
    newGame,
  });
};

//obtener todos los juegos registrados (tambien consolas que esten disponibles,los juegos y las resenias que se an echo sobre el juego)
const getAllGames = async (req, res) => {
  const games = await Game.findAll({
    include: Console,
    include: Review,
    include: GamesInConsoles,
  });
  //incluir las resenias
  res.status(200).json({
    games,
  });
};

//actualizar el titulo de un juego proteger jwt
const updateTitleOfOneGame = async (req, res) => {
  const { game } = req;
  const { title } = req.body;
  await game.update({ game: title });

  res.status(204).json({
    status: "success",
  });
};

//escribir resenia sobre un juego proteger jwt
const writeReviewOfGame = async (req, res) => {
  const { sessionUser, game } = req;
  const { comment } = req.body;
  const { gameId } = req.params;

  const newComment = await Review.create({
    userId: sessionUser.id,
    gameId: game.id,
    comment,
  });

  res.status(201).json({
    newComment,
    games,
    status: "success",
  });
};

//desabilitar juego proteger jwt
const desabiliteGame = async (req, res) => {
  const { game } = req;
  await game.update({ status: "cancelled" });
  res.status(204).json({
    status: "success",
  });
};

const conetTable = async (req, res) => {
  const { consoleId, gameId } = req.body;

  const reviews = await GamesInConsoles.create({ consoleId, gameId });
  res.status(201).json({
    reviews,
  });
};

module.exports = {
  conetTable,
  createNewGame,
  getAllGames,
  updateTitleOfOneGame,
  writeReviewOfGame,
  desabiliteGame,
};
