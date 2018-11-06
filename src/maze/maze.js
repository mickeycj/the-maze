class Maze {

  constructor(numRows, numCols, sourceRow, sourceCol, destinationRow, destinationCol) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.sourceRow = sourceRow;
    this.sourceCol = sourceCol;
    this.destinationRow = destinationRow;
    this.destinationCol = destinationCol;

    this.cells = [];
    for (let row = 0; row < this.numRows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.numCols; col++) {
        if (row === this.sourceRow && col === this.sourceCol) {
          this.cells[row][col] = new Cell(row, col, COLORS.SOURCE);
        } else if (row === this.destinationRow && col === this.destinationCol) {
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
