class Cell {

  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.x = this.col * CELL_DIMEN.WIDTH + OFFSET.X;
    this.x = this.row * CELL_DIMEN.HEIGHT + OFFSET.Y;

    this.color = COLORS.WALL;
    
    this.neighbors = {
      top: null,
      right: null,
      bottom: null,
      left: null
    };
  }
}
