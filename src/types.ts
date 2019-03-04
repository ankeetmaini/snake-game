export enum CellValue {
  EMPTY = "0",
  FOOD = "1",
  SNAKE = "2"
}

export type Snake = Point[];

export enum Direction {
  Left = "Left",
  Right = "Right",
  Up = "Up",
  Down = "Down"
}

export type Point = [number, number];

export interface IState {
  snake: Snake;
  direction: Direction;
  grid: CellValue[][];
  food: Point | null;
}
