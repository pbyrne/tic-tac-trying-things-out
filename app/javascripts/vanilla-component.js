const GameManager = require("./game-manager.js")

class GameBoard extends HTMLElement {
  constructor() {
    super() // Always call first
  }
}

customElements.define("game-board", GameBoard)

class GameTile extends HTMLElement {
  button

  constructor() {
    super() // Always call first

    this.button = document.createElement("button")
    this.button.classList.add("game--tile")
    this.button.addEventListener("click", this.play.bind(this))
  }

  connectedCallback() {
    this.appendChild(this.button)
  }

  set player(newValue) {
    if (newValue) {
      this.disabled = true
      this.setAttribute("player", newValue)
      this.title = `Played by ${newValue}`

      this.button.dataset.playedBy = newValue
      this.button.innerText = newValue
    } else {
      this.disabled = this.gameElement.isGameOver
      this.removeAttribute("player")
      this.title = "Unplayed"
    }
  }

  get player() {
    return this.getAttribute("player")
  }

  // TODO Understand why setting `element.disabled = true` doesn't make the element selectable with `[disabled]` selector (nor make the visible attribute change in the DOM).
  set disabled(newValue) {
    if (newValue) {
      this.setAttribute("disabled", true)
      this.button.disabled = true
    } else {
      this.removeAttribute("disabled")
      this.button.disabled = false
    }
  }

  get disabled() {
    this.getAttribute("disabled")
  }

  get board() {
    return this.closest("game-board")
  }

  get gameElement() {
    return this.closest("tic-tac-toe")
  }

  play(event) {
    console.log("GameTile.play", {this: this, event: event})
    this.gameElement.takeTurn(this)
  }
}

customElements.define("game-tile", GameTile, {extends: "button"})

class TicTacToe extends HTMLElement {
  manager
  titleElement
  marqueeElement
  boardElement

  constructor() {
    super() // Always call first

    this.classList.add("game")
    this.innerText = ""

    this.manager = new GameManager()

    this.titleElement = document.createElement("h2")
    this.titleElement.innerText = "Tic-Tac-Toe"
    this.appendChild(this.titleElement)

    this.marqueeElement = document.createElement("h3")
    this.marqueeElement.classList.add("game--marquee")
    this.marqueeElement.innerText = "Loading…"
    this.appendChild(this.marqueeElement)

    this.boardElement = document.createElement("game-board")
    this.boardElement.classList.add("game--board")
    this.appendChild(this.boardElement)

    this.draw()
  }

  get isGameOver() {
    return !!this.manager.game.winner
  }

  get winner() {
    return this.manager.game.winner
  }

  draw() {
    this.drawMarquee()
    this.drawBoard()
  }

  drawBoard() {
    this.manager.game.board.tiles.forEach((tile, index) => {
      const tileElement = this._findOrCreateTile({tile, index})
      tileElement.player = tile.player
    })
  }

  drawMarquee() {
    if (this.winner) {
      this.marqueeElement.innerText = `The winner is ${this.winner}!`
    } else {
      this.marqueeElement.innerText = `Current player: ${this.manager.game.currentPlayer}`
    }
  }

  takeTurn(tileElement) {
    this.manager.game.takeTurn({
      row: tileElement.dataset.row,
      column: tileElement.dataset.column,
    })
    this.draw()
  }

  _findOrCreateTile({index, tile}) {
    const existing = this.boardElement.querySelector(`game-tile[data-index="${index}"]`)

    if (existing) {
      return existing
    } else {
      const tileElement = document.createElement("game-tile")
      tileElement.dataset.row = tile.row
      tileElement.dataset.column = tile.column
      tileElement.dataset.index = index

      this.boardElement.appendChild(tileElement)

      return tileElement
    }
  }
}

customElements.define("tic-tac-toe", TicTacToe)
