class Dijkstra {

  constructor(animate) {
    this.animate = animate;
  }

  initialize(graph) {
    this.exploredEvents = [];
    this.solutionEvents = [];

    this.vertices = graph.vertices;
    this.source = graph.source;
    this.destination = graph.destination;

    this.openSet = [];
    this.closedSet = [];
    this.parents = Array(this.vertices.length).fill(null);
    this.distances = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);
  }

  solve(maze, graph) {
    this.initialize(graph);

    let current = this.source;
    let currentIndex = current.index;
    this.distances[currentIndex] = 0;
    this.openSet.push(current);

    let destinationReached = false;
    while (this.openSet.length > 0) {
      current = this.openSet.shift();
      currentIndex = current.index;
      
      Object.values(current.edges).filter((edge) => edge !== null && edge.vertex !== this.parents[currentIndex]).forEach((edge) => {
        if (!destinationReached) {
          const { vertex, weight } = edge;
          const next = vertex;
          const nextIndex = next.index;
          this.cellsExploredEvent(maze, current, next);
  
          const totalDistance = this.distances[currentIndex] + weight;
          if (this.distances[nextIndex] > totalDistance) {
            this.distances[nextIndex] = totalDistance;
            if (next === this.destination) {
              destinationReached = true;
            } else {
              this.parents[nextIndex] = current;
              this.openSet.push(next);
              this.openSet.sort((a, b) => {
                return this.distances[a.index] - this.distances[b.index];
              });
            }
          }
        }
      });

      if (destinationReached) {
        break;
      }
    }

    console.log(this.distances[this.destination.index]);
    return this.exploredEvents;
  }

  cellsExploredEvent(maze, current, next) {
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
          const cell = maze.cells[row][col];
          if (cell !== maze.source && cell !== maze.destination) {
            events.push(
              {
                cell: maze.cells[row][col],
                color: color
              }
            );
          }
        }
      }
      if (swap) {
        events = events.reverse();
      }

      this.exploredEvents = this.exploredEvents.concat(events);
    } else {
      for (let row = current.row; row <= next.row; row++) {
        for (let col = current.col; col <= next.col; col++) {
          const cell = maze.cells[row][col];
          if (cell !== maze.source && cell !== maze.destination) {
            cell.color = color;
          }
        }
      }
    }
  }

}
