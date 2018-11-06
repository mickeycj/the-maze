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
        if (col === this.source.col && row === this.source.row) {
          this.cells[row][col] = new Cell(row, col, COLORS.SOURCE);
        } else if (col === this.destination.col && row === this.destination.row) {
          this.cells[row][col] = new Cell(row, col, COLORS.DESTINATION);
        } else {
          this.cells[row][col] = new Cell(row, col);
        }
      }
    }
  }
}
