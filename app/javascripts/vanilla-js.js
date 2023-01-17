const GameManager = require("./game-manager.js")

class GamePlayer {
  manager
  container

  constructor({manager, container} = {}) {
    this.manager = manager
    this.container = container
  }

  get marqueeElement() {
    return this.container.querySelector(".game--marquee")
  }

  get boardElement() {
    return this.container.querySelector(".game--board")
  }

  drawBoard() {
    this.manager.game.board.tiles.forEach((tile, index) => {
      const button = this._findOrCreateButton({tile, index})

      if (tile.isPlayed) {
        button.title = `Played by ${tile.player}`
        button.disabled = true
        button.innerText = tile.player
        button.dataset.playedBy = tile.player
      } else {
        button.title = "Unplayed"
        button.disabled = !!this.manager.game.winner // Disable all buttons if there's a winner
      }
    })
  }

  takeTurn(event) {
    this.manager.game.takeTurn({
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
    const winner = this.manager.game.winner

    if (winner) {
      // TODO Add button to reset board when there's a winner
      this.marqueeElement.innerText = `The winner is ${winner}!`
    } else {
      this.marqueeElement.innerText = `Current player: ${this.manager.game.currentPlayer}`
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

const manager = new GameManager()
document.querySelectorAll("section.game").forEach((element) => {
  const gamePlayer = new GamePlayer({
    manager,
    container: element,
  })
  window.gamePlayer = gamePlayer
  gamePlayer.draw()
})

console.log({manager, gamePlayer})
