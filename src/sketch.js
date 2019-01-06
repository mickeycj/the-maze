const mySketch = new p5((sketch) => {

  let mazeEvents;
  let graphEvents;
  let solutionEvents;

  let source;
  let destination;
  let maze;

  let graph;
  let showGraph;

  let solver;

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH + 1, CANVAS_DIMEN.HEIGHT + 1);
    sketch.frameRate(FRAMERATE);
    
    showGraph = !SHOW_GRAPH;

    animateMaze = ANIMATE;
    animateGraph = ANIMATE && showGraph;
    animateSolution = ANIMATE;

    source = new Cell(0, 0, COLORS.SOURCE);
    destination = new Cell(MAZE_DIMEN.NUM_ROWS - 1, MAZE_DIMEN.NUM_COLS - 1, COLORS.DESTINATION);
    maze = new Maze(MAZE_DIMEN.NUM_ROWS, MAZE_DIMEN.NUM_COLS, source, destination, animateMaze);
    mazeEvents = maze.generate();
    maze.finished = !animateMaze;

    if (!animateMaze) {
      graph = new Graph(maze, animateGraph);
      graphEvents = graph.generate();
      graph.finished = !animateGraph;
      
      if (!animateGraph) {
        solver = new Dijkstra(maze, graph, animateSolution);
        solutionEvents = solver.solve();
      }
    }
  };

  sketch.draw = () => {
    if (sketch.frameCount > FRAMERATE * 1.5) {
      if (maze.finished && !graph) {
        graph = new Graph(maze, animateGraph);
        graphEvents = graph.generate();
        graph.finished = !animateGraph;
      }
      if (graph && graph.finished && !solver) {
        solver = new Dijkstra(maze, graph, animateSolution);
        solutionEvents = solver.solve();
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
        if (mazeEvents.length === 0) {
          maze.finished = true;
        }
      } else if (graphEvents.length > 0) {
        const { current, cell, next, dir } = graphEvents.shift();
        if (cell) {
          graph.addVertex(current, cell);
        } else if (next && dir) {
          current.addEdge(next, dir);
        }
        if (graphEvents.length === 0) {
          graph.finished = true;
        }
      } else if (solutionEvents.length > 0) {
        const { cell, color } = solutionEvents.shift();
        cell.color = color;
      }
    }

    maze.draw(sketch);
    if (graph && showGraph) {
      graph.draw(sketch);
    }
  };

}, SKETCH_NAME);
