const Board = require("./board.js")

class Game {
  board
  playerX
  playerO
  currentPlayer

  static X = "X"
  static O = "O"

  constructor({board, playerX, playerO, currentPlayer} = {}) {
    this.board = board
    this.playerX = playerX || this.constructor.X
    this.playerO = playerO || this.constructor.O
    this.currentPlayer = currentPlayer || this.playerX
  }

  static default() {
    return new Game({
      board: Board.default(),
    })
  }

  takeTurn({row, column, playedBy} = {}) {
    this.currentPlayer = playedBy || this.currentPlayer
    const playedTile = this.board.tileAt({row, column})
    const result = {playedTile, playedBy: this.currentPlayer}

    if (playedTile) {
      playedTile.player = this.currentPlayer
      this.currentPlayer = this.otherPlayer
    }

    result.nextPlayer = this.currentPlayer

    return result
  }

  get winner() {
    const winningSet = this.board.winnableSets.find((set) => {
      return this.checkForWinner(set)
    })

    if (winningSet) {
      return this.checkForWinner(winningSet)
    }
  }

  get otherPlayer() {
    return (this.currentPlayer === this.playerX ? this.playerO : this.playerX)
  }

  checkForWinner(tiles) {
    if (tiles.every((tile) => tile.player)) {
      const potentialWinner = tiles[0].player

      if (tiles.every((tile) => tile.player === potentialWinner)) {
        return potentialWinner
      }
    }
  }
}

module.exports = Game
