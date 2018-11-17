class Graph {

  constructor(maze) {
    this.maze = maze;
  }

  generate() {
    this.events = [];

    this.vertices = [];
    const topVertices = Array(this.maze.numCols).fill(null);
    this.maze.cells.forEach((row) => {
      let leftVertex = null;
      row.forEach((cell, col) => {
        let current = null;
        if (cell.neighbors.left) {
          if (cell.neighbors.right) {
            if (cell.neighbors.bottom || cell.neighbors.top) {
              current = this.addVertexEvent(cell);
              this.addEdgeEvent(current, leftVertex, 'left');
              leftVertex = current;
            }
          } else {
            current = this.addVertexEvent(cell);
            this.addEdgeEvent(current, leftVertex, 'left');
            leftVertex = null;
          }
        } else {
          if (cell.neighbors.right) {
            current = this.addVertexEvent(cell);
            leftVertex = current;
          } else if (!cell.neighbors.bottom || !cell.neighbors.top) {
            current = this.addVertexEvent(cell);
          }
        }
        if (current) {
          if (cell.neighbors.top) {
            this.addEdgeEvent(current, topVertices[col], 'top');
          }
          topVertices[col] = (cell.neighbors.bottom) ? current : null;
        }
      });
    });

    return this.events;
  }

  addVertexEvent(cell) {
    const current = new Vertex(cell.row, cell.col);
    this.events.push(
      {
        current: current,
        cell: cell
      }
    );

    return current;
  }

  addEdgeEvent(current, next, dir) {
    this.events.push(
      {
        current: current,
        next: next,
        dir: dir
      }
    );
  }

  addVertex(vertex, cell) {
    if (cell === this.maze.source) {
      this.source = vertex;
    } else if (cell === this.maze.destination) {
      this.destination = vertex;
    }
    this.vertices.push(vertex);
  }

  draw(sketch) {
    this.vertices.forEach((vertex) => vertex.draw(sketch));
  }
}
