// Game manager
import Game from "./Game.js";

// Game speed input
import {speedInput} from "./IO/GameControls";

// Game control setup
import connectInputsToGame from "./IO/GameControlSetup";

// Game presets
import * as preset from "./Grid/Presets.js";

// Create game instance
const GoL = new Game();

// Connect inputs to game
connectInputsToGame(GoL);

// Default to random grid
GoL.usePreset(preset.random)

// Run 
GoL.start(speedInput.value * 100)