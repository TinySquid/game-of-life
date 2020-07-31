// Game manager
import Game from "./Game.js";

// Game speed input
import { speedInput } from "./IO/GameControls";

// Game control setup
import connectInputsToGame from "./IO/GameControlSetup";

// Create game instance
const GoL = new Game();

// Connect inputs to game
connectInputsToGame(GoL);

// Run
GoL.start(speedInput.value * 5);
