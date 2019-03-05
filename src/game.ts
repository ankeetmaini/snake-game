import { CellValue, Direction, Point, IState } from "./types";

const getInitialGrid = (rows: number, cols: number): CellValue[][] => {
  const grid = Array.from({ length: rows }).map(_ =>
    Array.from({ length: cols }).map(_ => CellValue.EMPTY)
  );
  return grid;
};

const getNewHead = (curr: number[], direction: Direction): Point => {
  const [x, y] = curr;
  switch (direction) {
    case Direction.Left:
      return [x, y - 1];
    case Direction.Right:
      return [x, y + 1];
    case Direction.Down:
      return [x + 1, y];
    case Direction.Up:
      return [x - 1, y];
  }
};

export default function Game(
  rows: number = 5,
  cols: number = 5,
  renderer: (grid: CellValue[][]) => void
) {
  // only to copy it without having to create on every setState
  const pristineGrid = getInitialGrid(rows, cols);
  const initialSnake: Point[] = [
    [0, cols - 4],
    [0, cols - 3],
    [0, cols - 2],
    [0, cols - 1]
  ];
  const initialFood: Point = [0, 0];
  // state
  let state: IState = null;
  // DOM nodes
  const dom = {
    resultContainer: document.getElementById("root"),
    snakeLength: document.getElementById("snake-length")
  };

  const setState = (args: Exclude<Partial<IState>, "grid">) => {
    const newGrid = [...pristineGrid.map(row => row.slice())];
    const { food = state.food, snake } = args;
    if (food) {
      newGrid[food[0]][food[1]] = CellValue.FOOD;
    }
    if (snake) {
      snake.forEach(([x, y]) => {
        newGrid[x][y] = CellValue.SNAKE;
      });
    }
    state = Object.assign({}, state, args, { grid: newGrid });
  };
  setState({
    snake: initialSnake,
    food: initialFood,
    direction: Direction.Left,
    gameOver: false
  });

  const isGameOver = ([x, y]: Point) => {
    // checks if snake is out-of-bounds
    const inBounds = x >= 0 && y >= 0 && x < rows && y < cols;
    if (!inBounds) return true;
    // or it touched itself
    if (state.grid[x][y] === CellValue.EMPTY) return false;
    return true;
  };

  const moveSnake = () => {
    const { snake, direction } = state;
    const currHead = snake[0];
    // remove last bit of snake
    snake.splice(-1);
    // add new snake
    const newHead = getNewHead(currHead, direction);
    const gameOver = isGameOver(newHead);

    if (gameOver) {
      setState({ gameOver });
      return;
    }

    // else update the snake
    snake.unshift(newHead);
    setState({ snake });
  };

  const registerEventKeyHandlers = () => {
    document.addEventListener("keydown", e => {
      switch (e.key) {
        case "ArrowLeft":
          // only allow valid direction changes
          if (state.direction === Direction.Right) return;
          setState({ direction: Direction.Left });
          break;
        case "ArrowRight":
          if (state.direction === Direction.Left) return;
          setState({ direction: Direction.Right });
          break;
        case "ArrowUp":
          if (state.direction === Direction.Down) return;
          setState({ direction: Direction.Up });
          break;
        case "ArrowDown":
          if (state.direction === Direction.Up) return;
          setState({ direction: Direction.Down });
          break;
      }
    });
  };

  const showResult = () => {
    dom.snakeLength.textContent = `Snake length: ${state.snake.length + 1}`;
    dom.resultContainer.classList.remove("result");
  };

  const start = () => {
    // make snake move every one second
    return setTimeout(() => {
      moveSnake();
      renderer(state.grid);

      // check if game is over or not
      if (state.gameOver) {
        showResult();
        return;
      }

      start();
    }, 800);
  };

  // to start the ball rolling
  return () => {
    registerEventKeyHandlers();
    start();
  };
}
