// Game manager
import Game from "./Game.js";

// Game speed input
import { speedInput } from "./IO/GameControls";

// Game control setup
import addGameInputEventListeners from "./IO/GameControlSetup";

// Create game instance
const GoL = new Game();

// Setup event listeners & default settings
addGameInputEventListeners(GoL);

// Run
GoL.start(Number(speedInput.value));
