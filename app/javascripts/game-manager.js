// TODO Do we even need this object?
const Game = require("./game.js")

class GameManager {
  game

  static Game = Game

  constructor() {
    this.game = Game.default()
  }
}

module.exports = GameManager
