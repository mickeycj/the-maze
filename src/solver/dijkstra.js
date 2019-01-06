class Dijkstra extends Solver {

  constructor(maze, graph, animate) {
    super(maze, graph, animate)
  }

  solve() {
    this.exploredEvents = [];
    this.solutionEvents = [];

    this.openSet = [];
    this.closedSet = [];
    this.parents = Array(this.vertices.length).fill(null);
    this.distances = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);

    let current = this.sourceVertex;
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
          this.cellsExploredEvent(current, next);
  
          const totalDistance = this.distances[currentIndex] + weight;
          if (this.distances[nextIndex] > totalDistance) {
            this.distances[nextIndex] = totalDistance;
            this.parents[nextIndex] = current;
            if (next === this.destinationVertex) {
              destinationReached = true;
            } else {
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
    this.solutionEvent();
    
    return this.exploredEvents.concat(this.solutionEvents);
  }

}
