class Maze {

  constructor(numRows, numCols, source, destination) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.source = source;
    this.destination = destination;

    this.cells = [];
    for (let row = 0; row < this.numRows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.numCols; col++) {
        if (col === this.source.COL && row === this.source.ROW) {
          this.cells[row][col] = new Cell(row, col, COLORS.SOURCE);
        } else if (col === this.destination.COL && row === this.destination.ROW) {
          this.cells[row][col] = new Cell(row, col, COLORS.DESTINATION);
        } else {
          this.cells[row][col] = new Cell(row, col);
        }
      }
    }
  }

  draw(sketch) {
    this.cells.reduce((a, b) => a.concat(b), []).forEach((cell) => cell.draw(sketch));
  }
}
