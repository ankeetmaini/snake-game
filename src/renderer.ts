import { CellValue } from "./types";

const pixels = 20;
const getCanvas = () => {
  const canvas = document.getElementById("game-canvas");
  const context = (canvas as HTMLCanvasElement).getContext("2d");
  return context;
};

// this should return a render function which will update the grid
export default function renderer() {
  const canvas = getCanvas();
  return (grid: CellValue[][]) => {
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = colIndex * pixels;
        const y = rowIndex * pixels;
        switch (cell) {
          case CellValue.EMPTY:
            canvas.fillStyle = "black";
            break;
          case CellValue.FOOD:
            canvas.fillStyle = "yellow";
            break;
          case CellValue.SNAKE:
            canvas.fillStyle = "#97f108";
            break;
        }
        canvas.fillRect(x, y, pixels, pixels);
      });
    });
  };
}
