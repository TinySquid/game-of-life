// Game manager
import Game from "./Game.js";

// Game control setup
import setupInputEventListeners from "./IO/GameControlSetup";

// Create game instance
const GoL = new Game();

// Setup event listeners & default settings
setupInputEventListeners(GoL);

// Run
GoL.start();
