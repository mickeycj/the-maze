class Cell {

  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.x = this.col * CELL_DIMEN.WIDTH + OFFSET.X;
    this.x = this.row * CELL_DIMEN.HEIGHT + OFFSET.Y;

    this.color = COLORS.NO_PATH;

    this.neighbors = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }

  draw(sketch) {
    sketch.noStroke();
    sketch.fill(this.color);
    sketch.rect(this.x, this.y, CELL_DIMEN.WIDTH, CELL_DIMEN.HEIGHT);

    sketch.stroke(COLORS.WALL);
    if (!this.neighbors.top) {
      line(this.x, this.y, this.x + CELL_DIMEN.WIDTH, this.y);
    }
    if (!this.neighbors.right) {
      line(this.x + CELL_DIMEN.WIDTH, this.y, this.x + CELL_DIMEN.WIDTH, this.y + CELL_DIMEN.HEIGHT);
    }
    if (!this.neighbors.bottom) {
      line(this.x + CELL_DIMEN.WIDTH, this.y + CELL_DIMEN.HEIGHT, this.x, this.y + CELL_DIMEN.HEIGHT);
    }
    if (!this.neighbors.left) {
      line(this.x, this.y + CELL_DIMEN.HEIGHT, this.x, this.y);
    }
  }
}
