/**
 * The Game class handles all the logic
 * and drawing of the grid & cells.
 */

import { STATE, StateMachine } from "./GameState.js";
import Grid from "./Grid.js";

export default class Game {
  constructor(targetDelay = 10, preset = null) {
    this.gameState = new StateMachine();
    this.generation = 0;

    this.grid = new Grid(preset);

    const canvas = document.getElementById("game");

    this.context = canvas.getContext("2d");

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
    switch (this.gameState.state) {
      case STATE.PLAYING: {
        // TODO Run simulation step
        this.grid.draw(this.context);
        break;
      }
      case STATE.PAUSED: {
        // TODO Allow for toggling cells via mouse
        break;
      }
      case STATE.STOPPED: {
        // TODO Clear grid, reset game
        break;
      }
      default: {
        break;
      }
    }
  }
}
