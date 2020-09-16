// Game manager
import Game from "./Game.js";

// Save manager
import SaveManager from "./Storage/SaveManager";

// Game control setup
import setupInputEventListeners from "./IO/GameControlSetup";

// Create game instance
const GoL = new Game();

// Create save manager
const saveManager = new SaveManager(GoL);

// Setup event listeners & default settings
setupInputEventListeners(GoL);

// Run
GoL.start();
