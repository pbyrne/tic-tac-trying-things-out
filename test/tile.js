const Tile = require("../app/javascripts/tile.js")
const assert = require("chai").assert

describe("Tile", function() {
  describe("new", function() {
    it("retains its inputs", function() {
      const row = 1
      const column = 2

      const tile = new Tile({row, column})

      assert.equal(row, tile.row)
      assert.equal(column, tile.column)
      assert.isNotOk(tile.player)
    })
  })

  describe("isPlayed", function() {
    it("is true if the player is set", function() {
      const tile = new Tile()

      assert.isNotOk(tile.isPlayed)
    })

    it("is false if player is not set", function() {
      const tile = new Tile({player: "player1"})

      assert.isOk(tile.isPlayed)
    })
  })
})
