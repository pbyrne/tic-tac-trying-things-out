const Game = require("../app/javascripts/game.js")
const Board = require("../app/javascripts/board.js")
const Tile = require("../app/javascripts/tile.js")

const assert = require("chai").assert

describe("Game", function() {
  describe("new", function() {
    it("retains the given values", function() {
      const board = new Board()
      const player1 = "player1"
      const player2 = "player2"

      const game = new Game({board, player1, player2})

      assert.equal(board, game.board)
      assert.equal(player1, game.player1)
      assert.equal(player2, game.player2)
    })

    it("defaults to currentPlayer to player1", function() {
      const board = new Board()
      const player1 = "player1"
      const player2 = "player2"

      const game = new Game({board, player1, player2})

      assert.equal(player1, game.currentPlayer)
    })

    it("accepts an alternate currentPlayer", function() {
      const board = new Board()
      const player1 = "player1"
      const player2 = "player2"

      const game = new Game({board, player1, player2, currentPlayer: player2})

      assert.equal(player2, game.currentPlayer)
    })
  })

  describe("takeTurn", function() {
    it("records the move for the current player", function() {
      const tileToPlay = new Tile({row: 1, column: 1})
      const otherTile = new Tile({row: 2, column: 1})
      const player1 = "player1"
      const player2 = "player2"
      const board = new Board([tileToPlay, otherTile])

      const game = new Game({board: board, player1: player1, player2: player2})

      assert.equal(player1, game.currentPlayer)
      assert.notOk(tileToPlay.isPlayed)
      assert.notOk(otherTile.isPlayed)

      const result = game.takeTurn({row: tileToPlay.row, column: tileToPlay.column})

      assert.equal(player2, game.currentPlayer)
      assert.isOk(tileToPlay.isPlayed)
      assert.equal(player1, tileToPlay.player)
      assert.notOk(otherTile.isPlayed)

      assert.equal(tileToPlay, result.playedTile)
      assert.equal(player1, result.playedBy)
      assert.equal(player2, result.nextPlayer)
    })

    it("fails gracefully when given invalid coordinates", function() {
      const tile = new Tile({row: 1, column: 1})
      const player1 = "player1"
      const player2 = "player2"
      const board = new Board([tile])

      const game = new Game({board: board, player1: player1, player2: player2})

      assert.equal(player1, game.currentPlayer)
      assert.notOk(tile.isPlayed)

      const result = game.takeTurn({row: tile.row + 1, column: tile.column + 1})

      assert.equal(player1, game.currentPlayer)
      assert.notOk(tile.isPlayed)

      assert.isUndefined(result.playedTile)
      assert.equal(player1, result.playedBy)
      assert.equal(player1, result.nextPlayer)
    })
  })

  describe("winner", function() {
    it("is empty if there is no winner")
    it("is the player who has one whole row complete")
    it("is the player who has one whole column complete")
    it("is the player who has a diagonal complete")
  })
})
