export default class Tile {
  row
  column

  constructor({row, column, player} = {}) {
    this.row = row
    this.column = column
    this.player = player
  }

  get isPlayed() {
    return !!this.player
  }
}
