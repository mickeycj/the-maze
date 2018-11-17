class Vertex {

  constructor(row, col, color = COLORS.GRAPH) {
    this.row = row;
    this.col = col;
    this.x = this.col * VERTEX_DIMEN.WIDTH + VERTEX_DIMEN.WIDTH / 2;
    this.y = this.row * VERTEX_DIMEN.HEIGHT + VERTEX_DIMEN.HEIGHT / 2;

    this.color = color;

    this.edges = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }

  addEdge(other, dir, reverse = true) {
    this.edges[dir] = {
      vertex: other,
      weight: Math.abs(other.x - this.x) + Math.abs(other.y - this.y)
    };
    if (reverse) {
      let reverseDir = '';
      switch (dir) {
        case 'top':
          reverseDir = 'bottom';
          break;
        case 'right':
          reverseDir = 'left';
          break;
        case 'bottom':
          reverseDir = 'top';
          break;
        case 'left':
          reverseDir = 'right';
          break;
        default:
      }
      other.addEdge(this, reverseDir, false);
    }
  }

  draw(sketch) {
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.ellipse(this.x, this.y, VERTEX_DIMEN.WIDTH, VERTEX_DIMEN.HEIGHT);

    const dirs = Object.keys(this.edges);
    dirs.forEach((dir) => {
      const edge = this.edges[dir];
      if (edge) {
        sketch.strokeWeight(THICK);
        sketch.line(this.x, this.y, edge.vertex.x, edge.vertex.y);
      }
    });
  }
}
