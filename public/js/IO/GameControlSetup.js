// DOM Element controls
import * as GameControls from "./GameControls";
import presets from "../Presets/Presets";

function setupInputEventListeners(GoLInstance) {
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

  GameControls.presetPulsar.addEventListener("click", (e) => {
    GoLInstance.usePreset(presets.blankPreset);
  });
}

function setInputDefaults() {
  //* Set default values for inputs *//
  GameControls.speedInput.value = 100;

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

export default setupInputEventListeners;
