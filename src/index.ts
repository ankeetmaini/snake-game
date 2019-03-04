import Game from "./game";
import Renderer from "./renderer";
import "./app.scss";

const rows = 8;
const cols = 8;

// init
(() => {
  // this draw function needs to be called in raf
  const draw = Renderer();
  const start = Game(rows, cols, draw);
  start();
})();
