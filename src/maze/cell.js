class Cell {

  constructor(row, col, color = COLORS.NO_PATH) {
    this.row = row;
    this.col = col;
    this.x = this.col * CELL_DIMEN.WIDTH
    this.y = this.row * CELL_DIMEN.HEIGHT

    this.color = color;

    this.neighbors = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }

  addNeighbor(other, dir, reverse = true) {
    this.neighbors[dir] = other;
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
      other.addNeighbor(this, reverseDir, false);
    }
  }

  draw(sketch) {
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.rect(this.x, this.y, CELL_DIMEN.WIDTH, CELL_DIMEN.HEIGHT);

    sketch.stroke(COLORS.WALL);
    sketch.strokeWeight(THIN);
    if (!this.neighbors.top) {
      sketch.line(this.x, this.y, this.x + CELL_DIMEN.WIDTH, this.y);
    }
    if (!this.neighbors.right) {
      sketch.line(this.x + CELL_DIMEN.WIDTH, this.y, this.x + CELL_DIMEN.WIDTH, this.y + CELL_DIMEN.HEIGHT);
    }
    if (!this.neighbors.bottom) {
      sketch.line(this.x + CELL_DIMEN.WIDTH, this.y + CELL_DIMEN.HEIGHT, this.x, this.y + CELL_DIMEN.HEIGHT);
    }
    if (!this.neighbors.left) {
      sketch.line(this.x, this.y + CELL_DIMEN.HEIGHT, this.x, this.y);
    }
  }

}
