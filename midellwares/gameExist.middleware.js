const { Game } = require("../models/games.model");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/app.Error.util");

const gameExist = catchAsync(async (req, res, next) => {
  const { id, gameId } = req.params;
  const game = await Game.findOne({ where: { id: id || gameId } });
  if (!game) {
    return next(new AppError("Game not found", 404));
  }
  req.game = game;
  next();
});
module.exports = { gameExist };
