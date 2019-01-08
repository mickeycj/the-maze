class Dijkstra extends Solver {

  constructor(maze, graph, animate) {
    super(maze, graph, animate);
  }

  solve() {
    this.events = [];

    this.openSet = [];
    this.closedSet = [];
    this.parents = Array(this.vertices.length).fill(null);
    this.distances = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);

    let previous = null;
    let current = this.sourceVertex;
    let currentIndex = current.index;
    this.distances[currentIndex] = 0;
    this.openSet.push(current);

    let destinationReached = false;
    while (this.openSet.length > 0) {
      current = this.openSet.shift();
      currentIndex = current.index;
      previous = this.parents[currentIndex];
      this.closedSet.push(current);
      if (previous !== null) {
        this.cellsExploredEvent(previous, current);
      }
      
      Object.values(current.edges).filter((edge) => edge !== null).forEach((edge) => {
        if (!destinationReached && !this.closedSet.includes(edge.vertex)) {
          const { vertex, weight } = edge;
          const next = vertex;
          const nextIndex = next.index;
          this.cellsLookedEvent(current, next);
  
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
    this.traceSolution();
    
    return this.events;
  }

}
