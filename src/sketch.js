const mySketch = new p5((sketch) => {

  let events;

  let maze;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);
    sketch.frameRate(FRAMERATE);

    events = [];

    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, SOURCE.ROW, SOURCE.COL, DESTINATION.ROW, DESTINATION.COL);
    events.push(maze.generate());

    events = events.reduce((a, b) => a.concat(b), []);
  };

  sketch.draw = () => {
    if (sketch.frameCount > FRAMERATE * 1.5 && events.length > 0) {
      const { current, next, dir, color } = events.shift();
      const cell = (next && dir) ? next : current;
      if (!(cell.row === SOURCE.ROW && cell.col === SOURCE.COL || cell.row === DESTINATION.ROW && cell.col === DESTINATION.COL)) {
        cell.color = color;
      }
      if (next && dir) {
        current.addNeighbor(next, dir);
      }
    }

    maze.draw(sketch);
  };

}, SKETCH_NAME);
