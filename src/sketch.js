const mySketch = new p5((sketch) => {

  let mazeEvents;

  let source;
  let destination;
  let maze;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);
    sketch.frameRate(FRAMERATE);

    source = new Cell(0, 0, COLORS.SOURCE);
    destination = new Cell(MAZE_DIMEN.NUM_ROWS - 1, MAZE_DIMEN.NUM_COLS - 1, COLORS.DESTINATION);
    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, source, destination);
    mazeEvents = maze.generate();
  };

  sketch.draw = () => {
    if (sketch.frameCount > FRAMERATE * 1.5) {
      if (mazeEvents.length > 0) {
        const { current, next, dir, color } = mazeEvents.shift();
        const cell = (next && dir) ? next : current;
        if (cell !== source && cell !== destination) {
          cell.color = color;
        }
        if (next && dir) {
          current.addNeighbor(next, dir);
        }
      }
    }

    maze.draw(sketch);
  };

}, SKETCH_NAME);
