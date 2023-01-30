const Game = require("../app/javascripts/game.js")
const Board = require("../app/javascripts/board.js")
const Tile = require("../app/javascripts/tile.js")

const assert = require("chai").assert

describe("Game", function() {
  describe("new", function() {
    it("retains the given values", function() {
      const board = new Board()
      const playerX = "playerX"
      const playerO = "playerO"

      const game = new Game({board, playerX, playerO})

      assert.equal(board, game.board)
      assert.equal(playerX, game.playerX)
      assert.equal(playerO, game.playerO)
    })

    it("defaults to X and O players", function() {
      const board = new Board()

      const game = new Game({board})

      assert.equal(board, game.board)
      assert.equal(Game.X, game.playerX)
      assert.equal(Game.O, game.playerO)
    })

    it("defaults to currentPlayer to playerX", function() {
      const board = new Board()

      const game = new Game({board})

      assert.equal(game.playerX, game.currentPlayer)
    })

    it("accepts an alternate currentPlayer", function() {
      const board = new Board()
      const playerO = "playerO"

      const game = new Game({board, playerO, currentPlayer: playerO})

      assert.equal(playerO, game.currentPlayer)
    })
  })

  describe("takeTurn", function() {
    it("records the move for the current player", function() {
      const tileToPlay = new Tile({row: 1, column: 1})
      const otherTile = new Tile({row: 2, column: 1})
      const board = new Board([tileToPlay, otherTile])

      const game = new Game({board})

      assert.equal(game.playerX, game.currentPlayer)
      assert.notOk(tileToPlay.isPlayed)
      assert.notOk(otherTile.isPlayed)

      const result = game.takeTurn({
        row: tileToPlay.row,
        column: tileToPlay.column,
      })

      assert.equal(game.playerO, game.currentPlayer)
      assert.isOk(tileToPlay.isPlayed)
      assert.equal(game.playerX, tileToPlay.player)
      assert.notOk(otherTile.isPlayed)

      assert.equal(tileToPlay, result.playedTile)
      assert.equal(game.playerX, result.playedBy)
      assert.equal(game.playerO, result.nextPlayer)
    })

    it("accepts an override value for the player", function() {
      const tileToPlay = new Tile({row: 1, column: 1})
      const otherTile = new Tile({row: 2, column: 1})
      const board = new Board([tileToPlay, otherTile])

      const game = new Game({board})

      assert.equal(game.playerX, game.currentPlayer)
      assert.notOk(tileToPlay.isPlayed)
      assert.notOk(otherTile.isPlayed)

      const result = game.takeTurn({
        row: tileToPlay.row,
        column: tileToPlay.column,
        playedBy: game.playerO,
      })

      assert.equal(game.playerX, game.currentPlayer)
      assert.isOk(tileToPlay.isPlayed)
      assert.equal(game.playerO, tileToPlay.player)
      assert.notOk(otherTile.isPlayed)

      assert.equal(tileToPlay, result.playedTile)
      assert.equal(game.playerO, result.playedBy)
      assert.equal(game.playerX, result.nextPlayer)
    })

    it("fails gracefully when given invalid coordinates", function() {
      const tile = new Tile({row: 1, column: 1})
      const board = new Board([tile])

      const game = new Game({board})

      assert.equal(game.playerX, game.currentPlayer)
      assert.notOk(tile.isPlayed)

      const result = game.takeTurn({row: tile.row + 1, column: tile.column + 1})

      assert.equal(game.playerX, game.currentPlayer)
      assert.notOk(tile.isPlayed)

      assert.isUndefined(result.playedTile)
      assert.equal(game.playerX, result.playedBy)
      assert.equal(game.playerX, result.nextPlayer)
    })
  })

  describe("default", function() {
    it("defaults to a standard 3x3 grid, ready to play", function() {
      const game = Game.default()

      assert.equal(Game.X, game.playerX)
      assert.equal(Game.O, game.playerO)
      assert.equal(9, game.board.tiles.length)
      assert.isEmpty(game.board.tiles.filter(tile => tile.isPlayed))
      assert.equal(game.playerX, game.currentPlayer)
    })
  })

  describe("winner", function() {
    it("is empty if there is no winner", function() {
      const game = Game.default()

      assert.isNotOk(game.winner)
    })

    it("is the player who has one whole row complete", function() {
      const game = Game.default()

      game.takeTurn({row: 1, column: 1, playedBy: game.playerX})
      game.takeTurn({row: 1, column: 2, playedBy: game.playerX})
      game.takeTurn({row: 1, column: 3, playedBy: game.playerX})

      const result = game.winner
      assert.equal(game.playerX, result)
    })

    it("is the player who has one whole column complete", function() {
      const game = Game.default()

      game.takeTurn({row: 1, column: 2, playedBy: game.playerO})
      game.takeTurn({row: 2, column: 2, playedBy: game.playerO})
      game.takeTurn({row: 3, column: 2, playedBy: game.playerO})

      assert.equal(game.playerO, game.winner)
    })

    it.skip("is the player who has a diagonal complete", function() {
      const game = Game.default()

      game.takeTurn({row: 1, column: 1, playedBy: game.playerX})
      game.takeTurn({row: 2, column: 2, playedBy: game.playerX})
      game.takeTurn({row: 3, column: 3, playedBy: game.playerX})

      assert.equal(game.playerX, game.winner)
    })
  })
})
