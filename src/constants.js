const SKETCH_NAME = 'sketch';
const FRAMERATE = 60;
const CANVAS_DIMEN = {
  WIDTH: 690,
  HEIGHT: 690
};

const CELL_DIMEN = {
  WIDTH: 30,
  HEIGHT: 30
};
const MAZE_DIMEN = {
  NUM_ROWS: Math.floor(CANVAS_DIMEN.HEIGHT / CELL_DIMEN.HEIGHT),
  NUM_COLS: Math.floor(CANVAS_DIMEN.WIDTH / CELL_DIMEN.WIDTH)
};
const OFFSET = {
  X: Math.floor((CANVAS_DIMEN.WIDTH - CELL_DIMEN.WIDTH * MAZE_DIMEN.NUM_COLS) / 2),
  Y: Math.floor((CANVAS_DIMEN.HEIGHT - CELL_DIMEN.HEIGHT * MAZE_DIMEN.NUM_ROWS) / 2)
};
const COLORS = {
  WALL: '#000000',
  NO_PATH: '#444444',
  GENERATING: '#FFFF00',
  PATH: '#888888',
  SOURCE: '#0000FF',
  DESTINATION: '#FF0000'
};

const SOURCE = {
  ROW: 0,
  COL: 0
};
const DESTINATION = {
  ROW: MAZE_DIMEN.NUM_ROWS - 1,
  COL: MAZE_DIMEN.NUM_COLS - 1
};
