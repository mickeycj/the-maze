class AStar extends Solver {

  constructor(maze, graph, animate) {
    super(maze, graph, animate);
  }

  solve() {
    this.exploredEvents = [];
    this.solutionEvents = [];

    this.openSet = [];
    this.closedSet = [];
    this.parents = Array(this.vertices.length).fill(null);
    this.gScores = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);
    this.fScores = Array(this.vertices.length).fill(Number.MAX_SAFE_INTEGER);

    let previous = null;
    let current = this.sourceVertex;
    let currentIndex = current.index;
    this.gScores[currentIndex] = 0;
    this.fScores[currentIndex] = 0;
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
  
          const tentativeScore = this.gScores[currentIndex] + weight;
          if (this.gScores[nextIndex] > tentativeScore) {
            this.gScores[nextIndex] = tentativeScore;
            this.fScores[nextIndex] = this.gScores[nextIndex] + this.hScore(next);
            this.parents[nextIndex] = current;
            if (next === this.destinationVertex) {
              destinationReached = true;
            } else {
              this.openSet.push(next);
              this.openSet.sort((a, b) => {
                return this.fScores[a.index] - this.fScores[b.index];
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

  hScore(vertex) {
    return Math.abs(vertex.row - this.destinationVertex.row) + Math.abs(vertex.col - this.destinationVertex.col);
  }

}
