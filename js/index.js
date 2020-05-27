import Game from "./Game.js";

// Grid "initial state" presets
import preset from "./presets.js";

// targetDelay is how fast the iterations will be rendered
const gameOfLife = new Game(250, preset.blank);

// Start!
gameOfLife.play();
