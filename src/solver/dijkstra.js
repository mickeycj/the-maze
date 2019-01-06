class Dijkstra {

  constructor(animate) {
    this.animate = animate;
  }

  solve(maze, graph) {
    this.vertices = graph.vertices;
    this.source = graph.source;
    this.destination = graph.destination;

    this.openSet = [];
    this.closedSet = [];
    this.parents = Array(this.vertices.length).fill(null);
    this.distances = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);

    let current = this.source;
    let currentIndex = current.index;
    this.distances[currentIndex] = 0;
    this.openSet.push(current);

    let destinationReached = false;
    while (this.openSet.length > 0) {
      current = this.openSet.shift();
      currentIndex = current.index;
      
      Object.values(current.edges).filter((edge) => edge !== null && edge.vertex !== this.parents[currentIndex]).forEach((edge) => {
        const { vertex, weight } = edge;
        const next = vertex;
        const nextIndex = next.index;

        const totalDistance = this.distances[currentIndex] + weight;
        if (this.distances[nextIndex] > totalDistance) {
          this.distances[nextIndex] = totalDistance;
          if (next === this.destination) {
            destinationReached = true;
          }
          this.parents[nextIndex] = current;
          this.openSet.push(next);
          this.openSet.sort((a, b) => {
            return this.distances[a.index] - this.distances[b.index];
          });
        }
      });

      if (destinationReached) {
        break;
      }
    }

    console.log(this.distances[this.destination.index]);
  }

}
