# snake-game

```bash
yarn
yarn dev
```

> open [http://localhost:1234](http://localhost:1234)

# architecure

- [index.ts](src/index.ts)

  - entry point
  - intializes Game by passing it an instance of `Renderer` and grid size

- [game.ts](src/game.ts)

  - this takes care of the game loop
  - it keeps track of state, like snake's position, food and the grid
  - uses the `renderer.ts` to render the grid every 800ms

- [renderer.ts](src/renderer.ts)
  - this renders the grid to the screen
  - currently uses `Canvas`, but needs a bit more polishing
