import Game from "./Game.js";

// Grid "initial state" presets
import preset from "./presets.js";

const canvas = document.getElementById("canvas");

// Create game instance
// targetDelay is how fast the iterations will be rendered
const gameOfLife = new Game(canvas, 250, preset.blank);

// Control buttons
const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const stopBtn = document.getElementById("stop")

playBtn.addEventListener("click", (e) => {
  gameOfLife.play();
})
pauseBtn.addEventListener("click", (e) => {
  gameOfLife.pause();
})
stopBtn.addEventListener("click", (e) => {
  gameOfLife.stop();
})