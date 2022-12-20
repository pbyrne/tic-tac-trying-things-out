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

      const result = game.takeTurn({row: tileToPlay.row, column: tileToPlay.column})

      assert.equal(game.playerO, game.currentPlayer)
      assert.isOk(tileToPlay.isPlayed)
      assert.equal(game.playerX, tileToPlay.player)
      assert.notOk(otherTile.isPlayed)

      assert.equal(tileToPlay, result.playedTile)
      assert.equal(game.playerX, result.playedBy)
      assert.equal(game.playerO, result.nextPlayer)
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

  describe("winner", function() {
    it("is empty if there is no winner")
    it("is the player who has one whole row complete")
    it("is the player who has one whole column complete")
    it("is the player who has a diagonal complete")
  })
})
