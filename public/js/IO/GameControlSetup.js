// DOM Element controls
import * as GameControls from "./GameControls";

function addGameInputEventListeners(GoLInstance) {
  // Ensure default values
  setInputDefaults();

  // Connect buttons and inputs events to game instance event handler methods
  GameControls.playBtn.addEventListener("click", (e) => {
    GoLInstance.play();
  });

  GameControls.pauseBtn.addEventListener("click", (e) => {
    GoLInstance.pause();
  });

  GameControls.resetBtn.addEventListener("click", (e) => {
    GoLInstance.reset();
  });

  GameControls.clearBtn.addEventListener("click", (e) => {
    GoLInstance.clear();
  });

  GameControls.speedInput.addEventListener("change", (e) => {
    GoLInstance.setSimulationSpeed(Number(e.target.value));
  });
}

function setInputDefaults() {
  //* Set default values for inputs *//
  GameControls.speedInput.value = 100;

  // Set cell size initially based off client screen size
  // the game logic will set the canvas size later on.
  if (screen.width < 600 || window.innerWidth < 600) {
    GameControls.gridSizeInput.value = 75;
    GameControls.cellSizeInput.value = 4;
  } else {
    GameControls.gridSizeInput.value = 100;
    GameControls.cellSizeInput.value = 8;
  }

  // We want to disable the custom color inputs when we have randomColors enabled.
  GameControls.randomColorCheckBox.addEventListener("click", (e) => {
    if (e.target.checked) {
      GameControls.customColorLiving.disabled = true;
      GameControls.customColorDead.disabled = true;
    } else {
      GameControls.customColorLiving.disabled = false;
      GameControls.customColorDead.disabled = false;
    }
  });
}

module.exports = addGameInputEventListeners;
