import Game from "./game";
import Renderer from "./renderer";
import "./app.scss";

const rows = 8;
const cols = 8;

// init
(() => {
  const start = Game(rows, cols, Renderer());
  start();
})();
