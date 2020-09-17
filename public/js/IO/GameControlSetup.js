// DOM Element controls
import * as GameControls from "./GameControls";

// Needed for canvas event
import { canvas } from "../Canvas/GameCanvas";
import { STATE as GAME_STATE } from "../SM/GameState";

// Presets
import presets from "../Presets/Presets";

function initGameInputEventListeners(gameInstance) {
  // Set sim speed here
  gameInstance.simulationSpeed = GameControls.speedInput.valueAsNumber;

  //* Basic controls
  GameControls.playBtn.addEventListener("click", (e) => {
    gameInstance.play();
  });

  GameControls.pauseBtn.addEventListener("click", (e) => {
    gameInstance.pause();
  });

  GameControls.resetBtn.addEventListener("click", (e) => {
    gameInstance.reset();
  });

  GameControls.clearBtn.addEventListener("click", (e) => {
    gameInstance.clear();
  });

  //* Events for the save manager
  GameControls.saveBtn.addEventListener("click", (e) => {
    gameInstance.saveManager.save();
  });

  GameControls.loadBtn.addEventListener("click", (e) => {
    gameInstance.saveManager.load();
  });

  //* Simulation speed slider (values in ms)
  GameControls.speedInput.addEventListener("change", (e) => {
    gameInstance.simulationSpeed = e.target.valueAsNumber;
  });

  //* Handle size updates and regen board on change
  GameControls.gridSizeInput.addEventListener("change", (e) => {
    if (gameInstance.gameState === GAME_STATE.PLAYING) gameInstance.pause();

    gameInstance.setGeneration(0);

    gameInstance.grid.generateUsingRandomPreset();
  });

  GameControls.cellSizeInput.addEventListener("change", (e) => {
    if (gameInstance.gameState === GAME_STATE.PLAYING) gameInstance.pause();

    gameInstance.setGeneration(0);

    gameInstance.grid.generateUsingRandomPreset();
  });

  //* We want to disable the custom color inputs when we have randomColors enabled.
  GameControls.randomColorCheckBox.addEventListener("click", (e) => {
    // Color Inputs
    if (e.target.checked) {
      GameControls.customColorLiving.disabled = true;
      GameControls.customColorDead.disabled = true;
    } else {
      GameControls.customColorLiving.disabled = false;
      GameControls.customColorDead.disabled = false;
    }

    // Send update to grid
    gameInstance.grid.randomColors = e.target.checked;

    // Redraw cells
    gameInstance.grid.draw();
  });

  //* Redraw cells on color input change
  GameControls.customColorLiving.addEventListener("change", (e) => {
    gameInstance.grid.cellAliveColor = e.target.value;

    gameInstance.grid.draw();
  });

  GameControls.customColorDead.addEventListener("change", (e) => {
    gameInstance.grid.cellDeadColor = e.target.value;

    gameInstance.grid.draw();
  });

  //* Canvas Cell Toggle onClick
  // TODO Make it so mouse click + drag will auto toggle cells as cursor moves until user releases drag
  canvas.addEventListener("mousedown", (e) => {
    // Can only edit the grid when game is not in play
    if (gameInstance.gameState != GAME_STATE.PLAYING) {
      // Get position of canvas element
      const rect = canvas.getBoundingClientRect();

      // Normalize mouse coords relative to canvas
      const xCoord = Math.floor(e.clientX - rect.left);
      const yCoord = Math.floor(e.clientY - rect.top);

      // Get actual grid index of cell
      const cellX = Math.floor(xCoord / gameInstance.grid.cellSize);
      const cellY = Math.floor(yCoord / gameInstance.grid.cellSize);

      // Flip state and redraw grid
      gameInstance.grid.toggleCell(cellX, cellY);
    }
  });

  //* Preset listeners
  GameControls.presetPulsar.addEventListener("click", (e) => {
    gameInstance.usePreset(presets.FAKE_RANDOM_PRESET);
  });
}

function setGameInputDefaults() {
  //* Set default values for game inputs *//
  GameControls.speedInput.value = 100;

  GameControls.gridSizeInput.value = 35;
  GameControls.cellSizeInput.value = 16;

  GameControls.randomColorCheckBox.checked = false;

  GameControls.customColorLiving.value = "#ffffff";
  GameControls.customColorDead.value = "#000000";
}

export { initGameInputEventListeners, setGameInputDefaults };
