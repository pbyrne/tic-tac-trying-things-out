export default class Game {
  board
  player1
  player2
  currentPlayer

  constructor({board, player1, player2, currentPlayer} = {}) {
    this.board = board
    this.player1 = player1
    this.player2 = player2
    this.currentPlayer = currentPlayer || player1
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
    return (this.currentPlayer === this.player1 ? this.player2 : this.player1)
  }
}
