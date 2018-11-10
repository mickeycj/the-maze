var mySketch = new p5((sketch) => {

  let maze;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);
    sketch.frameRate(FRAMERATE);

    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, SOURCE.ROW, SOURCE.COL, DESTINATION.ROW, DESTINATION.COL);
    maze.generate();
  };

  sketch.draw = () => {
    maze.draw(sketch);
  };

}, SKETCH_NAME);
