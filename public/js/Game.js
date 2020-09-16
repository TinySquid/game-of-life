// DOM Elements & Control
import { canvas } from "./Canvas/GameCanvas";
import { updateCounter } from "./IO/GameOutputs";
import { speedInput, gridSizeInput, cellSizeInput, overrideWithPresetValues } from "./IO/GameControls";

// Game Classes
import { StateMachine, STATE as GAME_STATE } from "./SM/GameState.js";
import Grid from "./Grid/Grid.js";

export default class Game {
  constructor() {
    /*
      1. Generation counter
      2. Grid instance
      3. Game state
      4. Game simulation speed
      5. IntervalID for wait loop - Keeps iterations at or slightly above target speed
      6. Event handlers for canvas & grid changes
    */

    this.generation = 0;

    this.grid = new Grid();

    this.gameState = new StateMachine();

    this.simulationSpeed = Number(speedInput.value);

    this.gameLoopIntervalId = null;

    this._initEventHandlers();
  }

  // Kickoff the first game loop iteration
  start() {
    requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
  }

  usePreset(preset) {
    overrideWithPresetValues(preset);

    this.grid.generateUsingPreset(preset);
  }

  setSimulationSpeed(newSpeed) {
    this.simulationSpeed = newSpeed;
  }

  /* GAME CONTROLS */
  play() {
    this.simulationSpeed = Number(speedInput.value);

    this.gameState.transitionTo(GAME_STATE.PLAYING);
  }

  pause() {
    this.gameState.transitionTo(GAME_STATE.PAUSED);
  }

  reset() {
    // Make a new randomized grid
    this.grid.reset();

    this.gameState.transitionTo(GAME_STATE.STOPPED);
  }

  clear() {
    this.grid.clear();

    this.gameState.transitionTo(GAME_STATE.STOPPED);
  }

  /* GAME LOOP  */
  _iterateGameLoop() {
    const t0 = performance.now();

    switch (this.gameState.state) {
      case GAME_STATE.PLAYING: {
        /*
        //* Run simulation step
        Make a copy of the grid and run the algorithm to
        determine what cells will live / die / grow.
        Update original grid with the newly derived one.
        */

        const nextGridState = [];

        for (let y = 0; y < this.grid.gridSize; y++) {
          const row = [];

          for (let x = 0; x < this.grid.gridSize; x++) {
            const currentCell = this.grid.getCellAtIndex(x, y);

            const livingNeighbors = this.grid.getCellNeighbors(x, y);

            /*
            Any live cell with two or three live neighbours survives.
            Any dead cell with three live neighbours becomes a live cell.
            All other live cells die in the next generation. Similarly, all other dead cells stay dead.

            */
            if (currentCell === 1) {
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
          nextGridState.push(row);
        }

        this.grid.update(nextGridState);

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

    //* Keep us within our targetDelay
    if (performance.now() - t0 < this.simulationSpeed) {
      // Start a wait interval loop because we haven't reached targetDelay yet
      this.gameLoopIntervalId = setInterval(this._waitloop.bind(this, t0), 20);
    } else {
      requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
    }
  }

  //* Keeps us at or slightly above targetDelay for game loop iteration and rendering
  _waitloop(startTime) {
    if (performance.now() - startTime >= this.simulationSpeed) {
      // Turn off wait loop and go back to iterate game loop again
      clearInterval(this.gameLoopIntervalId);
      requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
    }
  }

  _initEventHandlers() {
    //* Reset generation counter when board / cell parameters change
    //* Grid class handles the actual updating itself
    gridSizeInput.addEventListener("change", (e) => {
      this.generation = 0;
    });

    cellSizeInput.addEventListener("change", (e) => {
      this.generation = 0;
    });

    //* Canvas Cell Toggle onClick
    // TODO Make it so mouse click + drag will auto toggle cells as cursor moves until user releases drag
    canvas.addEventListener("mousedown", (e) => {
      // Can only edit the grid when game is not in play
      if (this.gameState.state != GAME_STATE.PLAYING) {
        // Get position of canvas element
        const rect = canvas.getBoundingClientRect();

        // Normalize mouse coords relative to canvas
        const xCoord = Math.floor(e.clientX - rect.left);
        const yCoord = Math.floor(e.clientY - rect.top);

        // Get actual grid index of cell
        const cellX = Math.floor(xCoord / this.grid.cellSize);
        const cellY = Math.floor(yCoord / this.grid.cellSize);

        // Flip state and redraw grid
        this.grid.toggleCell(cellX, cellY);
      }
    });
  }
}
