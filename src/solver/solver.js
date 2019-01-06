class Solver {

  constructor(maze, graph, animate) {
    this.animate = animate;
    
    this.events = [];
    this.solution = [];

    this.cells = maze.cells;
    this.sourceCell = maze.source;
    this.destinationCell = maze.destination;

    this.vertices = graph.vertices;
    this.sourceVertex = graph.source;
    this.destinationVertex = graph.destination;

    this.parents = Array(this.vertices.length).fill(null);
  }

  cellsLookedEvent(current, next) {
    const color = COLORS.LOOKED;
    const currentCell = this.cells[current.row][current.col];

    let swap = false;
    if (current.row > next.row || current.col > next.col) {
      [current, next] = [next, current];
      swap = true;
    }

    if (this.animate) {
      let events = [];

      for (let row = current.row; row <= next.row; row++) {
        for (let col = current.col; col <= next.col; col++) {
          const cell = this.cells[row][col];
          if (cell !== this.sourceCell && cell !== this.destinationCell && cell !== currentCell) {
            events.push(
              {
                cell: this.cells[row][col],
                color: color
              }
            );
          }
        }
      }
      if (swap) {
        events = events.reverse();
      }
      this.events = this.events.concat(events);
    } else {
      for (let row = current.row; row <= next.row; row++) {
        for (let col = current.col; col <= next.col; col++) {
          const cell = this.cells[row][col];
          if (cell !== this.sourceCell && cell !== this.destinationCell) {
            cell.color = color;
          }
        }
      }
    }
  }

  cellsExploredEvent(current, next) {
    const color = COLORS.EXPLORED;

    let swap = false;
    if (current.row > next.row || current.col > next.col) {
      [current, next] = [next, current];
      swap = true;
    }

    if (this.animate) {
      let events = [];

      for (let row = current.row; row <= next.row; row++) {
        for (let col = current.col; col <= next.col; col++) {
          const cell = this.cells[row][col];
          if (cell !== this.sourceCell && cell !== this.destinationCell) {
            events.push(
              {
                cell: this.cells[row][col],
                color: color
              }
            );
          }
        }
      }
      if (swap) {
        events = events.reverse();
      }
      this.events = this.events.concat(events);
    } else {
      for (let row = current.row; row <= next.row; row++) {
        for (let col = current.col; col <= next.col; col++) {
          const cell = this.cells[row][col];
          if (cell !== this.sourceCell && cell !== this.destinationCell) {
            cell.color = color;
          }
        }
      }
    }
  }

  traceSolution() {
    const color = COLORS.SOLUTION;

    let previous = this.destinationVertex;
    let current = this.parents[previous.index];

    let solution = [this.cells[previous.row][previous.col]];
    while (previous !== this.sourceVertex) {
      let subSolution = [];
      
      let swap = false;
      if (previous.row > current.row || previous.col > current.col) {
        [current, previous] = [previous, current];
        swap = true;
      }
      for (let row = previous.row; row <= current.row; row++) {
        for (let col = previous.col; col <= current.col; col++) {
          const cell = this.cells[row][col];
          if (cell !== this.sourceCell && cell !== this.destinationCell) {
            subSolution.push(cell);
          }
        }
      }
      if (swap) {
        subSolution = subSolution.reverse();
        [current, previous] = [previous, current];
      }
      solution = solution.concat(subSolution);

      previous = current;
      current = this.parents[previous.index];
    }
    solution = solution.reverse();
    solution.pop();

    if (this.animate) {
      this.solution = solution.map((cell) => {
        return {
          cell: cell,
          color: color
        };
      })
    } else {
      solution.forEach((cell) => {
        cell.color = color;
      })
    }
  }

}
