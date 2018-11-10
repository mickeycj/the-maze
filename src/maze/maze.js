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

  generate() {
    this.visited = Array.from({ length: this.numRows }, (_) => Array(this.numCols).fill(false));
    const stack = [];

    let current = this.cells[this.sourceRow][this.sourceCol];
    stack.push(current);
    this.visited[current.row][current.col] = true;
    while (stack.length > 0) {
      let neighbors = this.getCandidateNeighbors(current.row, current.col);
      while (Object.values(neighbors).filter((neighbor) => neighbor !== null).length === 0) {
        if (stack.length === 0) {
          return;
        }
        current = stack.pop();
        neighbors = this.getCandidateNeighbors(current.row, current.col);
      }
      const dir = this.getRandomNeighborDirection(neighbors);
      const next = neighbors[dir];
      current.addNeighbor(next, dir);
      if (next.row === this.destinationRow && next.col === this.destinationCol) {
        this.visited[next.row][next.col] = true;
      } else {
        current = next;
        stack.push(current);
        this.visited[current.row][current.col] = true;
      }
    }
  }

  getCandidateNeighbors(row, col) {
    const neighbors = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
    if (row - 1 >= 0 && !this.visited[row - 1][col]) {
      neighbors.top = this.cells[row - 1][col];
    }
    if (col + 1 < this.numCols && !this.visited[row][col + 1]) {
      neighbors.right = this.cells[row][col + 1];
    }
    if (row + 1 < this.numRows && !this.visited[row + 1][col]) {
      neighbors.bottom = this.cells[row + 1][col];
    }
    if (col - 1 >= 0 && !this.visited[row][col - 1]) {
      neighbors.left = this.cells[row][col - 1];
    }
    
    return neighbors;
  }

  getRandomNeighborDirection(neighbors) {
    Object.keys(neighbors).forEach((dir) => {
      if (neighbors[dir] === null || neighbors[dir] === undefined) {
        delete neighbors[dir];
      }
    });
    const dirs = Object.keys(neighbors);
    
    return dirs[Math.floor(Math.random() * dirs.length)];
  }

  draw(sketch) {
    this.cells.reduce((a, b) => a.concat(b), []).forEach((cell) => cell.draw(sketch));
  }

}
