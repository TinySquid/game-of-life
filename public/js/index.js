import Game from "./Game.js";

// Grid "initial state" presets
import preset from "./presets.js";

// Create game instance
// targetDelay is how fast the iterations will be rendered in ms
const gameOfLife = new Game(100, preset.blank);

// Control buttons
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const clearBtn = document.getElementById("clear");

playBtn.addEventListener("click", (e) => {
  gameOfLife.play();
});

pauseBtn.addEventListener("click", (e) => {
  gameOfLife.pause();
});

stopBtn.addEventListener("click", (e) => {
  gameOfLife.stop();
});

clearBtn.addEventListener("click", (e) => {
  gameOfLife.clear();
});
