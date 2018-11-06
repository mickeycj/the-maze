var mySketch = new p5((sketch) => {

  sketch.setup = () => {
    sketch.createCanvas(CANVAS_DIMEN.WIDTH, CANVAS_DIMEN.HEIGHT);
  };

  sketch.draw = () => {
    sketch.background(COLORS.WALL);
  };
}, SKETCH_NAME);
