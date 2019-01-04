const mySketch = new p5((sketch) => {

  let animate;

  let mazeEvents;
  let graphEvents;

  let source;
  let destination;
  let maze;

  let graph;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);
    sketch.frameRate(FRAMERATE);

    animateMaze = ANIMATE;
    animateGraph = ANIMATE;

    source = new Cell(0, 0, COLORS.SOURCE);
    destination = new Cell(MAZE_DIMEN.NUM_ROWS - 1, MAZE_DIMEN.NUM_COLS - 1, COLORS.DESTINATION);
    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, source, destination, animateMaze);
    mazeEvents = maze.generate();
    if (!animateMaze && !animateGraph) {
      graph = new Graph(maze, animateGraph);
      graph.generate();
    }
  };

  sketch.draw = () => {
    if (sketch.frameCount > FRAMERATE * 1.5) {
      if (!graph && mazeEvents.length === 0) {
        graph = new Graph(maze, animateGraph);
        graphEvents = graph.generate();
      }
      if (mazeEvents.length > 0) {
        const { current, next, dir, color } = mazeEvents.shift();
        const cell = (next && dir) ? next : current;
        if (cell !== source && cell !== destination) {
          cell.color = color;
        }
        if (next && dir) {
          current.addNeighbor(next, dir);
        }
      } else if (graphEvents.length > 0) {
        const { current, cell, next, dir } = graphEvents.shift();
        if (cell) {
          graph.addVertex(current, cell);
        } else if (next && dir) {
          current.addEdge(next, dir);
        }
      }
    }

    maze.draw(sketch);
    if (graph) {
      graph.draw(sketch);
    }
  };

}, SKETCH_NAME);
