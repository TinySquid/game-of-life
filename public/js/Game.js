// When we load a preset we want to override all input values to match
import { overrideWithPresetValues } from "./IO/GameControls";

// Sets up event handlers / misc logic todo with inputs
import { initGameInputEventListeners, setGameInputDefaults } from "./IO/GameControlSetup";

// Generation counter
import { updateCounter } from "./IO/GameOutputs";

// Save handling, state management, grid controller
import SaveManager from "./Storage/SaveManager";
import { StateMachine, STATE as GAME_STATE } from "./SM/GameState.js";
import Grid from "./Grid/Grid.js";

export default class Game {
  constructor() {
    this.generation = 0;
    this.simulationSpeed = null;
    this._gameLoopIntervalId = null;

    // Handles save / load and indexDB
    this.saveManager = new SaveManager(this);

    // Game loop relies on state machine to decide what to do each iteration
    this._gameState = new StateMachine();

    //! Grid relies on input values so setGameInputDefaults must be called first
    setGameInputDefaults();

    // Grid handles cell drawing, supporting methods for core game logic
    this.grid = new Grid();

    //! initGameInputEventListeners must be called at the end as it sets all the event listeners for the Game, Grid, etc
    initGameInputEventListeners(this);
  }

  // Kickoff the first game loop iteration
  start() {
    requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
  }

  // TODO move to save manager for preset handling
  usePreset(preset) {
    overrideWithPresetValues(preset);

    this.grid.generateUsingPreset(preset);

    this.simulationSpeed = preset.simulationSpeed;
  }

  get gameState() {
    return this._gameState.state;
  }

  setGeneration(generation) {
    // Always update the counter when we change the generation
    this.generation = generation;

    updateCounter(this.generation);
  }

  /* GAME CONTROLS */
  play() {
    this._gameState.transitionTo(GAME_STATE.PLAYING);
  }

  pause() {
    this._gameState.transitionTo(GAME_STATE.PAUSED);
  }

  reset() {
    this.grid.reset();

    this._gameState.transitionTo(GAME_STATE.STOPPED);
  }

  clear() {
    this.grid.clear();

    this._gameState.transitionTo(GAME_STATE.STOPPED);
  }

  /* GAME LOOP  */
  _iterateGameLoop() {
    const t0 = performance.now();

    switch (this._gameState.state) {
      case GAME_STATE.PLAYING: {
        /*
        //* Run simulation step
        Make a copy of the grid and run the algorithm to
        determine what cells will live / die / grow.
        Switch out current grid with new buffer
        */

        const nextGridState = [];

        // O(n^2)
        for (let y = 0; y < this.grid.gridSize; y++) {
          const row = [];

          for (let x = 0; x < this.grid.gridSize; x++) {
            const currentCell = this.grid.getCellAtIndex(x, y);

            const livingNeighbors = this.grid.getCellNeighbors(x, y);

            /*
            Rules of the game -
            Any live cell with two or three live neighbours survives.
            Any dead cell with three live neighbours becomes a live cell.
            All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            */

            if (currentCell === 1) {
              if (livingNeighbors === 2 || livingNeighbors === 3) {
                // Cell stays alive
                row.push(1);
              } else {
                // Cell dies per the rules
                row.push(0);
              }
            } else {
              // Cell is dead, should it become alive next iteration?
              if (livingNeighbors === 3) {
                // RESURRECTION 100
                row.push(1);
              } else {
                // No :(
                row.push(0);
              }
            }
          }
          nextGridState.push(row);
        }

        // Swap grids
        this.grid.update(nextGridState);

        this.setGeneration(this.generation + 1);

        break;
      }
      case GAME_STATE.PAUSED: {
        break;
      }
      case GAME_STATE.STOPPED: {
        this.setGeneration(0);

        this._gameState.transitionTo(GAME_STATE.IDLE);

        break;
      }
    }

    //* Keep us within our targetDelay
    if (performance.now() - t0 < this.simulationSpeed) {
      // Start a wait interval loop because we haven't reached targetDelay yet
      this._gameLoopIntervalId = setInterval(this._waitloop.bind(this, t0), 20);
    } else {
      requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
    }
  }

  // Used by game loop interval for time keeping
  _waitloop(startTime) {
    //* Keeps us at or slightly above targetDelay for game loop iteration and rendering
    if (performance.now() - startTime >= this.simulationSpeed) {
      // Turn off wait loop and go back to iterate game loop again
      clearInterval(this._gameLoopIntervalId);
      requestAnimationFrame(this._iterateGameLoop.bind(this, this.simulationSpeed));
    }
  }
}
