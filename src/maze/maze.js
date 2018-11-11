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
        if (row === this.source.row && col === this.source.col) {
          this.cells[row][col] = this.source;
        } else if (row === this.destination.row && col === this.destination.col) {
          this.cells[row][col] = this.destination
        } else {
          this.cells[row][col] = new Cell(row, col);
        }
      }
    }
  }

  generate() {
    const events = [];

    this.visited = Array.from({ length: this.numRows }, (_) => Array(this.numCols).fill(false));
    const stack = [];

    let current = this.source;
    stack.push(current);
    this.visited[current.row][current.col] = true;
    while (true) {
      let neighbors = this.getCandidateNeighbors(current);
      while (stack.length > 0 && Object.values(neighbors).filter((neighbor) => neighbor !== null).length === 0) {
        current = stack.pop();
        events.push(
          {
            current: current,
            color: COLORS.PATH
          }
        );
        neighbors = this.getCandidateNeighbors(current);
      }
      if (stack.length === 0) {
        break;
      }
      
      const dir = this.getRandomNeighborDirection(neighbors);
      const next = neighbors[dir];
      events.push(
        {
          current: current,
          next: next,
          dir: dir,
          color: COLORS.GENERATING
        }
      );

      if (next === this.destination) {
        this.visited[next.row][next.col] = true;
      } else {
        current = next;
        stack.push(current);
        this.visited[current.row][current.col] = true;
      }
    }

    return events;
  }

  getCandidateNeighbors(cell) {
    const neighbors = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
    if (cell.row - 1 >= 0 && !this.visited[cell.row - 1][cell.col]) {
      neighbors.top = this.cells[cell.row - 1][cell.col];
    }
    if (cell.col + 1 < this.numCols && !this.visited[cell.row][cell.col + 1]) {
      neighbors.right = this.cells[cell.row][cell.col + 1];
    }
    if (cell.row + 1 < this.numRows && !this.visited[cell.row + 1][cell.col]) {
      neighbors.bottom = this.cells[cell.row + 1][cell.col];
    }
    if (cell.col - 1 >= 0 && !this.visited[cell.row][cell.col - 1]) {
      neighbors.left = this.cells[cell.row][cell.col - 1];
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
