class Maze {

  constructor(numRows, numCols, source, destination, animate) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.source = source;
    this.destination = destination;

    this.animate = animate;
    
    this.initialize();
  }

  initialize() {
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

    this.visited = Array.from({ length: this.numRows }, (_) => Array(this.numCols).fill(false));
    
    this.destinationFound = false;
  }

  generate() {
    this.events = [];

    let current = this.source;
    this.stack = [current];
    this.visited[current.row][current.col] = true;
    while (true) {
      let neighbors = this.getCandidateNeighbors(current);
      while (this.stack.length > 0 && Object.values(neighbors).filter((neighbor) => neighbor !== null).length === 0) {
        current = this.popStackEvent();
        neighbors = this.getCandidateNeighbors(current);
      }
      if (this.stack.length === 0) {
        break;
      }
      
      const dir = this.getRandomNeighborDirection(current, neighbors);
      const next = this.addNeighborEvent(current, neighbors, dir);
      if (next === this.destination) {
        for (let i = 0; i < DESTINATION_BUFFER; i++) {
          this.visited[current.row][current.col] = true;
          current = this.popStackEvent();
        }
        this.destinationFound = true;
        this.visited[next.row][next.col] = true;
      } else {
        current = next;
        this.stack.push(current);
        this.visited[current.row][current.col] = true;
      }
    }

    return this.events;
  }

  popStackEvent() {
    const current = this.stack.pop();
    const color = COLORS.PATH;
    if (this.animate) {
      this.events.push(
        {
          current: current,
          color: color
        }
      );
    } else if (current !== this.source && current !== this.destination) {
      current.color = color;
    }

    return current;
  }

  addNeighborEvent(current, neighbors, dir) {
    const next = neighbors[dir];
    const color = COLORS.GENERATING;
    if (this.animate) {
      this.events.push(
        {
          current: current,
          next: next,
          dir: dir,
          color: color
        }
      );
    } else {
      if (next !== this.source && next !== this.destination) {
        next.color = color;
      }
      current.addNeighbor(next, dir);
    }

    return next;
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

  getRandomNeighborDirection(cell, neighbors) {
    const getRandomDirection = (neighbors) => {
      Object.keys(neighbors).forEach((dir) => {
        if (neighbors[dir] === null || neighbors[dir] === undefined) {
          delete neighbors[dir];
        }
      });
      const dirs = Object.keys(neighbors);
      
      return dirs[Math.floor(Math.random() * dirs.length)];
    };

    if (!this.destinationFound) {
      if (cell.row === this.destination.row && cell.col === this.destination.col - 1) {
        return 'right';
      } else if (cell.row === this.destination.row - 1 && cell.col === this.destination.col) {
        return 'bottom';
      } else {
        return getRandomDirection(neighbors);
      }
    } else {
      return getRandomDirection(neighbors);
    }
  }

  draw(sketch) {
    this.cells.reduce((a, b) => a.concat(b), []).forEach((cell) => cell.draw(sketch));
  }

}
