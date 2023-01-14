const GameManager = require("../app/javascripts/game-manager.js")

const assert = require("chai").assert

describe("GameManager", function() {
  describe("new", function() {
    it("uses the default game", function() {
      const manager = new GameManager();

      assert.equal(9, manager.game.board.tiles.length)
      assert.equal(manager.game.playerX, manager.game.currentPlayer)
    })
  })
})

