/**
 * The Game class handles all the logic
 * and drawing of the grid & cells.
 */

import { STATE, StateMachine } from "./GameState.js";
import Grid from "./Grid.js";

export default class Game {
  constructor(genCounter, canvas, targetDelay = 10, preset = null) {
    this.gameState = new StateMachine();
    this.grid = new Grid(preset);
    this.genCounter = genCounter;
    this.generation = 0;

    this.context = canvas.getContext("2d");

    // Setup mouse click detection on canvas
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();

      // Normalize mouse coords relative to canvas
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      const cell = this.grid.getCellAt(x, y);

      // Can only edit the grid when game is paused / stopped / idle
      if (this.gameState.state != STATE.PLAYING) {
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
    // Using .bind to maintain reference to 'this'
    setInterval(this.runGameLoop.bind(this), targetDelay);
  }

  pause() {
    this.gameState.transitionTo(STATE.PAUSED);
  }

  play() {
    this.gameState.transitionTo(STATE.PLAYING);
  }

  stop() {
    this.gameState.transitionTo(STATE.STOPPED);
  }

  runGameLoop() {
    // TODO Game loop logic
    // game loop functionality is dynamic to the game's current state
    // Always draw the grid
    this.grid.draw(this.context);

    switch (this.gameState.state) {
      case STATE.PLAYING: {
        // TODO Run simulation step
        /*
        Make a copy of the grid and run the algorithm to
        determine what cells will live / die / grow.
        Overwrite the original grid with the new state.

        rules -> 
        
        */
        this.generation++;
        this.genCounter.textContent = `Generation: ${this.generation}`;
        break;
      }
      case STATE.PAUSED: {
        // Nothing needs to be done here but I'm leaving it for future stuff
        break;
      }
      case STATE.STOPPED: {
        this.grid.reset();

        this.gameState.transitionTo(STATE.IDLE);
        break;
      }
      default: {
        break;
      }
    }
  }
}
