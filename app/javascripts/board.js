const Tile = require("./tile")
const utils = require("./utils")

class Board {
  _tiles = []

  constructor(tiles) {
    this.tiles = tiles || []
  }

  static default() {
    return new Board([
      new Tile({row: 1, column: 1}),
      new Tile({row: 1, column: 2}),
      new Tile({row: 1, column: 3}),
      new Tile({row: 2, column: 1}),
      new Tile({row: 2, column: 2}),
      new Tile({row: 2, column: 3}),
      new Tile({row: 3, column: 1}),
      new Tile({row: 3, column: 2}),
      new Tile({row: 3, column: 3}),
    ])
  }

  column(value) {
    return this.tiles.filter(tile => tile.column === value)
  }

  row(value) {
    return this.tiles.filter(tile => tile.row === value)
  }

  get winnableSets() {
    const result = []

    // Rows
    Object.values(utils.groupBy(this.tiles, (tile) => tile.row)).forEach((row) => {
      result.push(row)
    })

    // Columns
    Object.values(utils.groupBy(this.tiles, (tile) => tile.column)).forEach((column) => {
      result.push(column)
    })

    // TODO: Diagonals

    return result
  }

  get tiles() {
    return this._tiles
  }

  set tiles(newTiles) {
    newTiles.forEach((tile, i) => {
      if (newTiles.filter((innerTile) =>  tile.row === innerTile.row && tile.column === innerTile.column ).length > 1) {
        throw "Cannot submit multiple tiles with the same coordinates"
      }
    })

    this._tiles = newTiles
  }

  tileAt({row, column} = {}) {
    return this.tiles.find(tile => tile.row === row && tile.column === column)
  }
}

module.exports = Board
