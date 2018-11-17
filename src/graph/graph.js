class Graph {

  constructor(maze) {
    this.maze = maze;

    this.vertices = [];
    const topVertices = Array(maze.numCols).fill(null);
    maze.cells.forEach((row) => {
      let leftVertex = null;
      row.forEach((cell, col) => {
        let current = null;
        if (cell.neighbors.left) {
          if (cell.neighbors.right) {
            if (cell.neighbors.bottom || cell.neighbors.top) {
              current = this.addVertex(cell);
              current.addEdge(leftVertex, 'left');
              leftVertex = current;
            }
          } else {
            current = this.addVertex(cell);
            current.addEdge(leftVertex, 'left');
            leftVertex = null;
          }
        } else {
          if (cell.neighbors.right) {
            current = this.addVertex(cell);
            leftVertex = current;
          } else if (!cell.neighbors.bottom || !cell.neighbors.top) {
            current = this.addVertex(cell);
          }
        }
        if (current) {
          if (cell.neighbors.top) {
            current.addEdge(topVertices[col], 'top');
          }
          topVertices[col] = (cell.neighbors.bottom) ? current : null;
        }
      });
    });
  }

  addVertex(cell) {
    const current = new Vertex(cell.row, cell.col);
    this.vertices.push(current);
    if (cell === this.maze.source) {
      this.source = current;
    } else if (cell === this.maze.destination) {
      this.destination = current;
    }

    return current;
  }

  draw(sketch) {
    this.vertices.forEach((vertex) => vertex.draw(sketch));
  }
}
