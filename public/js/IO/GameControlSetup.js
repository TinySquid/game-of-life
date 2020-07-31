// DOM Element controls
import * as GameControls from "./GameControls";

function connectInputsToGame(GoLInstance) {
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
    GoLInstance.setSimulationSpeed(e.target.value * 10);
  });
}

function setInputDefaults() {
  //* Set default values for inputs *//
  GameControls.speedInput.value = 5;
  GameControls.gridSizeInput.value = 100;

  // Set cell size initially based off client screen size
  // the game logic will set the canvas size later on.
  if (screen.width < 600 || window.innerWidth < 600) {
    GameControls.cellSizeInput.value = 4;
  } else {
    GameControls.cellSizeInput.value = 6;
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

module.exports = connectInputsToGame;
