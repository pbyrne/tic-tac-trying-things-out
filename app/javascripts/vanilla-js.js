const Game = require("./game.js");
const Board = require("./board.js");
const Tile = require("./tile.js");

const game = new Game({
  board: new Board([
    new Tile({row: 1, column: 1}),
    new Tile({row: 1, column: 2, player: "X"}),
    new Tile({row: 1, column: 3}),
    new Tile({row: 2, column: 1}),
    new Tile({row: 2, column: 2, player: "X"}),
    new Tile({row: 2, column: 3}),
    new Tile({row: 3, column: 1, player: "O"}),
    new Tile({row: 3, column: 2}),
    new Tile({row: 3, column: 3}),
  ]),
  player1: "X",
  player2: "O",
})

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

  drawBoard() {
    this.game.board.tiles.forEach((tile, i) => {
      const button = document.createElement("button")
      button.classList.add("game--tile")
      button.dataset.row = tile.row
      button.dataset.column = tile.column
      button.dataset.index = i
      if (tile.isPlayed) {
        button.title = "Unplayed"
        button.disabled = true
        button.innerText = tile.player
        button.dataset.playedBy = tile.player
      } else {
        button.title = "Unplayed"
      }

      this.boardElement.appendChild(button)
    })
  }

  updateMarquee() {
    this.marqueeElement.innerText = `Current player: ${this.game.currentPlayer}`
  }
}

document.querySelectorAll("section.game").forEach((element) => {
  const gamePlayer = new GamePlayer({
    game,
    container: element,
  })
  window.gamePlayer = gamePlayer
  gamePlayer.drawBoard()
})

console.log({game, gamePlayer})
