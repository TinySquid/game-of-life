/**
 * The Game class handles all the logic
 * and drawing of the grid & cells.
 */

// DOM Elements & Control
import { canvas } from "./canvas";
import { updateCounter } from "./generationCounter";

// Game Classes
import { StateMachine, STATE as GAME_STATE } from "./GameState.js";
import Grid from "./Grid.js";

export default class Game {
  /* 
  targetDelay (ms) -> Delay between game loop iteration
  preset -> Grid preset from JSON string
  */
  constructor(targetDelay = 10, preset = null) {
    this.generation = 0;
    this.grid = new Grid(preset);
    this.gameState = new StateMachine();

    // Setup mouse click detection on canvas so we can toggle individual cells
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();

      // Normalize mouse coords relative to canvas
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      const cell = this.grid.getCellAtCoord(x, y);

      // Can only edit the grid when game is paused / stopped / idle
      if (this.gameState.state != GAME_STATE.PLAYING) {
        if (cell) {
          // Toggle cell state
          if (cell.isAlive) {
            cell.kill();
          } else {
            cell.resurrect(); // Turn on the cell
          }
        }
      }
    });

    // Run the game loop at interval set by targetDelay (ms)
    // Using .bind to maintain reference to 'this' (game class instance)
    setInterval(this.runGameLoop.bind(this), targetDelay);
  }

  /* GAME CONTROLS */
  pause() {
    this.gameState.transitionTo(GAME_STATE.PAUSED);
  }

  play() {
    this.gameState.transitionTo(GAME_STATE.PLAYING);
  }

  stop() {
    this.gameState.transitionTo(GAME_STATE.STOPPED);
  }

  clear() {
    // Clear board and reset generation counter
    this.generation = 0;

    this.grid.reset();
  }

  /* GAME LOGIC ITERATION HANDLER */
  runGameLoop() {
    // Game loop functionality is dynamic to the game's current state

    switch (this.gameState.state) {
      case GAME_STATE.PLAYING: {
        //* Run simulation step
        /*
        Make a copy of the grid and run the algorithm to
        determine what cells will live / die / grow.
        Update grid with new state.
        */
        const updatedGrid = [...this.grid.state];

        for (let y = 0; y < this.grid.height; y++) {
          for (let x = 0; x < this.grid.width; x++) {
            // Grab ref to current cell object
            const currentCell = this.grid.getCellAtIndex(x, y);

            // Get its neighbors
            const livingNeighbors = this.grid.getCellNeighbors(x, y);

            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            // if (currentCell.isAlive && livingNeighbors > 3) {
            //   // console.log("Killing cell")
            //   updatedGrid[y][x].kill();
            // } else if (!currentCell.isAlive && livingNeighbors === 3) {
            //   // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            //   // console.log("Rebirthing cell")
            //   updatedGrid[y][x].resurrect();
            // } else {
            //   updatedGrid[y][x].kill();
            // }
          }
        }

        // Update grid with changes
        this.grid.update(updatedGrid);

        this.generation++;

        break;
      }
      case GAME_STATE.PAUSED: {
        // Nothing needs to be done here but I'm leaving it for future stuff like a "paused" menu overlay
        break;
      }
      case GAME_STATE.STOPPED: {
        this.grid.reset();

        this.generation = 0;

        this.gameState.transitionTo(GAME_STATE.IDLE);
        break;
      }
    }

    // Update counter
    updateCounter(this.generation);

    // Draw grid
    this.grid.draw();
  }
}
