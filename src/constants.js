const SKETCH_NAME = 'sketch';
const FRAMERATE = 60;
const CANVAS_DIMEN = {
  WIDTH: 690,
  HEIGHT: 690
};
const ANIMATE = true;

const CELL_DIMEN = {
  WIDTH: 30,
  HEIGHT: 30
};
const MAZE_DIMEN = {
  NUM_ROWS: Math.floor(CANVAS_DIMEN.HEIGHT / CELL_DIMEN.HEIGHT),
  NUM_COLS: Math.floor(CANVAS_DIMEN.WIDTH / CELL_DIMEN.WIDTH)
};
const DESTINATION_BUFFER = 2;

const VERTEX_DIMEN = {
  WIDTH: CELL_DIMEN.WIDTH / 2,
  HEIGHT: CELL_DIMEN.HEIGHT / 2
};

const THIN = 1;
const THICK = CELL_DIMEN.WIDTH / 12;
const COLORS = {
  WALL: '#000000',
  NO_PATH: '#444444',
  GENERATING: '#FFFFFF',
  PATH: '#888888',
  SOURCE: '#0000FF',
  DESTINATION: '#FF0000',
  GRAPH: '#FFFFFF'
};
const TEXT_SIZE = CELL_DIMEN.WIDTH / 3;
const TEXT_OFFSET = CELL_DIMEN.WIDTH / 6;
