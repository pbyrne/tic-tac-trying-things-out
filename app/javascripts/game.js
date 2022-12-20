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

  takeTurn({row, column} = {}) {
    const playedTile = this.board.tileAt({row, column})
    const result = {playedTile, playedBy: this.currentPlayer}

    if (playedTile) {
      playedTile.player = this.currentPlayer
      this.currentPlayer = this._otherPlayer()
    }

    result.nextPlayer = this.currentPlayer

    return result
  }

  _otherPlayer() {
    return (this.currentPlayer === this.playerX ? this.playerO : this.playerX)
  }
}

module.exports = Game
