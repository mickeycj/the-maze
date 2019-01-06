class Vertex {

  constructor(row, col, index, color = COLORS.GRAPH) {
    this.row = row;
    this.col = col;
    this.index = index;

    this.x = this.col * VERTEX_DIMEN.WIDTH * 2 + VERTEX_DIMEN.WIDTH;
    this.y = this.row * VERTEX_DIMEN.HEIGHT * 2 + VERTEX_DIMEN.HEIGHT;

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
      weight: Math.abs(other.row - this.row) + Math.abs(other.col - this.col)
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
    dirs.filter((dir) => dir === 'top' || dir === 'left').forEach((dir) => {
      const edge = this.edges[dir];
      if (edge) {
        sketch.stroke(this.color);
        sketch.strokeWeight(THICK);
        sketch.line(this.x, this.y, edge.vertex.x, edge.vertex.y);
        
        const textOffset = this.textOffset(edge);
        sketch.noStroke();
        sketch.fill(this.color);
        sketch.textSize(TEXT_SIZE);
        sketch.textStyle(sketch.NORMAL);
        sketch.text(edge.weight, (this.x + edge.vertex.x) / 2 + textOffset.x, (this.y + edge.vertex.y) / 2 - textOffset.y);
      }
    });
  }

  textOffset(edge) {
    return {
      x: (Math.abs(this.row - edge.vertex.row) > 0) ? TEXT_OFFSET : -TEXT_OFFSET / 2,
      y: (Math.abs(this.col - edge.vertex.col) > 0) ? TEXT_OFFSET : -TEXT_OFFSET / 2
    };
  }
}
