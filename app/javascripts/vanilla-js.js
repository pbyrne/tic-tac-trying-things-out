const Game = require("./game.js")

class GamePlayer {
  game
  container

  constructor({game, container} = {}) {
    this.game = game
    this.container = container
  }

  get marqueeElement() {
    return this.container.querySelector(".game--marquee")
  }

  get boardElement() {
    return this.container.querySelector(".game--board")
  }

  get isGameOver() {
    return !!this.game.winner
  }


  drawBoard() {
    this.game.board.tiles.forEach((tile, index) => {
      const button = this._findOrCreateButton({tile, index})

      if (tile.isPlayed) {
        button.title = `Played by ${tile.player}`
        button.disabled = true
        button.innerText = tile.player
        button.dataset.playedBy = tile.player
      } else {
        button.title = "Unplayed"
        button.disabled = this.isGameOver
      }
    })
  }

  takeTurn(event) {
    this.game.takeTurn({
      row: event.target.dataset.row,
      column: event.target.dataset.column,
    })
    this.draw()
  }

  draw() {
    this.updateMarquee()
    this.drawBoard()
  }

  updateMarquee() {
    const winner = this.game.winner

    if (winner) {
      // TODO Add button to reset board when there's a winner
      this.marqueeElement.innerText = `The winner is ${winner}!`
    } else {
      this.marqueeElement.innerText = `Current player: ${this.game.currentPlayer}`
    }
  }

  _findOrCreateButton({index, tile} = {}) {
    const existing = this.container.querySelector(`button[data-index="${index}"]`)

    if (existing) {
      return existing
    } else {
      const button = document.createElement("button")
      button.classList.add("game--tile")
      button.dataset.row = tile.row
      button.dataset.column = tile.column
      button.dataset.index = index

      button.addEventListener("click", this.takeTurn.bind(this))
      this.boardElement.appendChild(button)

      return button
    }
  }
}

const game = Game.default()
document.querySelectorAll("section.game").forEach((element) => {
  const gamePlayer = new GamePlayer({
    game,
    container: element,
  })
  window.gamePlayer = gamePlayer
  gamePlayer.draw()
})
