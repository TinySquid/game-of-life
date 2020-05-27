import Game from "./Game.js";

// Grid "initial state" presets
import preset from "./presets.js";

const canvas = document.getElementById("game");

// targetDelay is how fast the iterations will be rendered
const gameOfLife = new Game(canvas, 250, preset.blank);

// Start!
gameOfLife.play();
gameOfLife.pause();
