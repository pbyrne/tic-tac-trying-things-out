const Board = require("../app/javascripts/board.js")
const Tile = require("../app/javascripts/tile.js")
const assert = require("chai").assert

describe("Board", function() {
  describe("new", function() {
    it("retains the tiles", function() {
      const tile1 = new Tile()
      const board = new Board([tile1])

      assert.equal(tile1, board.tiles[0])
    })

    it("prevents multiple tiles at the same coordinate", function() {
      const original = new Tile({row: 1, column: 2})
      const duplicate = new Tile({row: original.row, column: original.column})

      assert.throws(function() {
        new Board([original, duplicate])
      })
    })

    it("defaults to an empty board", function() {
      const board = new Board()

      assert.isEmpty(board.tiles)
    })
  })

  describe(".row", function() {
    it("returns tiles in the given row", function() {
      const firstRowA = new Tile({row: 0, column: 0})
      const firstRowB = new Tile({row: 0, column: 1})
      const secondRow = new Tile({row: 1, column: 0})

      const board = new Board([firstRowA, firstRowB, secondRow])

      assert.include(board.row(firstRowA.row), firstRowA)
      assert.include(board.row(firstRowA.row), firstRowB)
      assert.notInclude(board.row(firstRowA.row), secondRow)
    })
  })

  describe(".column", function() {
    it("returns tiles in the given column", function() {
      const firstColumnA = new Tile({row: 0, column: 0})
      const firstColumnB = new Tile({row: 1, column: 0})
      const secondColumn = new Tile({row: 0, column: 1})

      const board = new Board([firstColumnA, firstColumnB, secondColumn])

      assert.include(board.column(firstColumnA.column), firstColumnA)
      assert.include(board.column(firstColumnA.column), firstColumnB)
      assert.notInclude(board.column(firstColumnA.column), secondColumn)
    })
  })

  describe(".tiles=", function() {
    it("replaces the current set of tiles", function() {
      const originalTiles = [new Tile()]
      const newTiles = [new Tile()]

      const board = new Board(originalTiles)

      assert.equal(originalTiles, board.tiles)

      board.tiles = newTiles

      assert.equal(newTiles, board.tiles)
    })

    it("fails if given duplicate tiles", function() {
      const original = new Tile({row: 1, column: 2})
      const duplicate = new Tile({row: original.row, column: original.column})

      const board = new Board()

      assert.throws(function() {
        board.tiles = [original, duplicate]
      })
    })
  })

  describe("tileAt", function() {
    it("finds the tile at the given row and column number", function() {
      const matchingTile = new Tile({row: 1, column: 1})
      const nonmatchingTile = new Tile({row: 2, column: 2})

      const board = new Board([
        matchingTile,
        nonmatchingTile,
      ])

      const result = board.tileAt({row: matchingTile.row, column: matchingTile.column})

      assert.equal(matchingTile, result)
    })

    it("finds the tile at the given row and column string", function() {
      const matchingTile = new Tile({row: 1, column: 1})
      const nonmatchingTile = new Tile({row: 2, column: 2})

      const board = new Board([
        matchingTile,
        nonmatchingTile,
      ])

      const result = board.tileAt({row: `${matchingTile.row}`, column: `${matchingTile.column}`})

      assert.equal(matchingTile, result)
    })

    it("gracefully handles no matching tile", function() {
      const tile = new Tile({row: 1, column: 1})

      const board = new Board([
        tile,
      ])

      const result = board.tileAt({row: tile.row + 1, column: tile.column + 1})

      assert.isUndefined(result)
    })
  })
})
