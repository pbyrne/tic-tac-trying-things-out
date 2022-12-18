export default class Board {
  _tiles = []

  constructor(tiles) {
    this.tiles = tiles || []
  }

  column(value) {
    return this.tiles.filter(tile => tile.column === value)
  }

  row(value) {
    return this.tiles.filter(tile => tile.row === value)
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
}
