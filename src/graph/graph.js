class Graph {

  constructor(maze) {
    this.vertices = [];
  }

  draw(sketch) {
    this.vertices.forEach((vertex) => vertex.draw(sketch));
  }
}
