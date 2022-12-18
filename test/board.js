import Board from "../app/javascripts/board.js"
import Tile from "../app/javascripts/tile.js"
import {assert} from "chai"

describe("Board", () => {
  describe("new", () => {
    it("retains the tiles", () => {
      const tile1 = new Tile()
      const board = new Board([tile1])

      assert.equal(tile1, board.tiles[0])
    })

    it("prevents multiple tiles at the same coordinate", () => {
      const original = new Tile({row: 1, column: 2})
      const duplicate = new Tile({row: original.row, column: original.column})

      assert.throws(() => {
        new Board([original, duplicate])
      })
    })
  })

  describe(".row", () => {
    it("returns tiles in the given row", () => {
      const firstRowA = new Tile({row: 0, column: 0})
      const firstRowB = new Tile({row: 0, column: 1})
      const secondRow = new Tile({row: 1, column: 0})

      const board = new Board([firstRowA, firstRowB, secondRow])

      assert.include(board.row(firstRowA.row), firstRowA)
      assert.include(board.row(firstRowA.row), firstRowB)
      assert.notInclude(board.row(firstRowA.row), secondRow)
    })
  })

  describe(".column", () => {
    it("returns tiles in the given column", () => {
      const firstColumnA = new Tile({row: 0, column: 0})
      const firstColumnB = new Tile({row: 1, column: 0})
      const secondColumn = new Tile({row: 0, column: 1})

      const board = new Board([firstColumnA, firstColumnB, secondColumn])

      assert.include(board.column(firstColumnA.column), firstColumnA)
      assert.include(board.column(firstColumnA.column), firstColumnB)
      assert.notInclude(board.column(firstColumnA.column), secondColumn)
    })
  })

  describe(".tiles=", () => {
    it("replaces the current set of tiles", () => {
      const originalTiles = [new Tile()]
      const newTiles = [new Tile()]

      const board = new Board(originalTiles)

      assert.equal(originalTiles, board.tiles)

      board.tiles = newTiles

      assert.equal(newTiles, board.tiles)
    })

    it("fails if given duplicate tiles", () => {
      const original = new Tile({row: 1, column: 2})
      const duplicate = new Tile({row: original.row, column: original.column})

      const board = new Board()

      console.log("test assert.throws start")
      assert.throws(() => {
        console.log("TEST assert.throws inside before")
        board.tiles = [original, duplicate]
        console.log("TEST assert.throws inside after")
      })
      console.log("test assert.throws done")
    })
  })
})
