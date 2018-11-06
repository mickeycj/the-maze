var mySketch = new p5((sketch) => {

  let maze;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);

    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, SOURCE, DESTINATION);
  };

  sketch.draw = () => {
    maze.draw(sketch);
  };
}, SKETCH_NAME);
