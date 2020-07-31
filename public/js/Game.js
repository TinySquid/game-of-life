// DOM Elements & Control
import { canvas } from "./Canvas/GameCanvas";
import { updateCounter } from "./IO/GameOutputs";

// Game Classes
import { StateMachine, STATE as GAME_STATE } from "./SM/GameState.js";
import Grid from "./Grid/Grid.js";

export default class Game {
  constructor() {
    // Barebones setup needs a - sim speed, grid, generation counter, statemachine, waitLoop interval ID
    this.generation = 0;
    this.grid = new Grid();
    this.gameState = new StateMachine();
    this.simulationSpeed = 500;
    this.gameLoopIntervalId = null;

    this.enableCanvasClickEvent();
  }

  // Kickoff the first game loop iteration
  start(simulationSpeed) {
    this.simulationSpeed = simulationSpeed;
    requestAnimationFrame(this.runGameLoop.bind(this, this.simulationSpeed));
  }

  usePreset(preset) {
    this.grid.generateUsingPreset(preset);
  }

  setSimulationSpeed(newSpeed) {
    this.simulationSpeed = newSpeed;
  }

  /* GAME CONTROLS */
  play() {
    this.gameState.transitionTo(GAME_STATE.PLAYING);
  }

  pause() {
    this.gameState.transitionTo(GAME_STATE.PAUSED);
  }

  reset() {
    this.gameState.transitionTo(GAME_STATE.STOPPED);

    // Make a new randomized grid
    this.grid.generateUsingRandom();
  }

  clear() {
    this.generation = 0;

    this.grid.reset();
  }

  /* GAME LOOP  */
  runGameLoop() {
    const t0 = performance.now();

    // Game loop functionality is dynamic to the game's current state thanks the statemachine
    switch (this.gameState.state) {
      case GAME_STATE.PLAYING: {
        //* Run simulation step
        /*
        Make a copy of the grid and run the algorithm to
        determine what cells will live / die / grow.
        Update grid with new state.
        */
        const updatedGrid = [];

        for (let y = 0; y < this.grid.height; y++) {
          const row = [];

          for (let x = 0; x < this.grid.width; x++) {
            // Get cell and current living neighbors
            const currentCell = this.grid.getCellAtIndex(x, y);

            const livingNeighbors = this.grid.getCellNeighbors(x, y);

            /*
            Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            Any live cell with two or three live neighbours lives on to the next generation.
            Any live cell with more than three live neighbours dies, as if by overpopulation.
            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

            These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

            Any live cell with two or three live neighbours survives.
            Any dead cell with three live neighbours becomes a live cell.
            All other live cells die in the next generation. Similarly, all other dead cells stay dead.

            */
            if (currentCell.isAlive) {
              if (livingNeighbors === 2 || livingNeighbors === 3) {
                // Cell stays alive
                row.push(1);
              } else {
                // Underpopulation & Overpopulation rules kill the cell
                row.push(0);
              }
            } else {
              // Cell is dead, should it become alive next iteration?
              if (livingNeighbors === 3) {
                row.push(1);
              } else {
                // No :(
                row.push(0);
              }
            }
          }
          updatedGrid.push(row);
        }

        this.grid.update(updatedGrid);

        this.generation++;

        break;
      }
      case GAME_STATE.PAUSED: {
        break;
      }
      case GAME_STATE.STOPPED: {
        this.generation = 0;

        this.gameState.transitionTo(GAME_STATE.IDLE);

        break;
      }
    }

    updateCounter(this.generation);

    this.grid.draw();

    //* All code below is just to keep us within our targetDelay

    if (performance.now() - t0 < this.simulationSpeed * 100) {
      // Start a wait interval loop because we haven't reached targetDelay yet
      this.gameLoopIntervalId = setInterval(this.waitLoop.bind(this, t0), 10);
    } else {
      requestAnimationFrame(this.runGameLoop.bind(this, this.simulationSpeed));
    }
  }

  //* Keeps us at or above targetDelay for game loop iteration and rendering
  waitLoop(startTime) {
    if (performance.now() - startTime >= this.simulationSpeed) {
      // Turn off wait loop and go back to iterate game loop again
      clearInterval(this.gameLoopIntervalId);
      requestAnimationFrame(this.runGameLoop.bind(this, this.simulationSpeed));
    }
  }

  //* Enables cell toggling via mouse click on canvas
  enableCanvasClickEvent() {
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();

      // Normalize mouse coords relative to canvas
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      const cell = this.grid.getCellAtCoord(x, y);

      // Can only edit the grid when game is not in play
      if (this.gameState.state != GAME_STATE.PLAYING) {
        // Sanity check, can probably remove...
        if (cell) {
          // Toggle cell state
          if (cell.isAlive) {
            cell.kill();
          } else {
            cell.resurrect();
          }
        }
      }

      // Manually re-render
      this.grid.draw();
    });
  }
}
