// Control Buttons
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const clearBtn = document.getElementById("clear-btn");

// Save / Load Grid Buttons
const saveBtn = document.getElementById("save-btn");
const loadBtn = document.getElementById("load-btn");

// Preset Modal Elements
const presetModal = document.getElementsByClassName("modal")[0];
const presetModalBody = document.getElementsByClassName("modal-body")[0];
const presetModalCloseElements = document.getElementsByClassName("close");

// Game Simulation Speed Slider
const speedInput = document.getElementById("game-speed-input");

// Grid & Cell Controls
const gridSizeInput = document.getElementById("grid-size-input");
const cellSizeInput = document.getElementById("cell-size-input");

// Cell Color Controls
const randomColorCheckBox = document.getElementById("random-colors-check");
const customColorLiving = document.getElementById("custom-color-living-input");
const customColorDead = document.getElementById("custom-color-dead-input");

// Presets
const presetPulsar = document.getElementById("pulsar");

function overrideWithPresetValues(values) {
  speedInput.value = values.simulationSpeed;

  gridSizeInput.value = values.gridSize;

  cellSizeInput.value = values.cellSize;

  randomColorCheckBox.checked = values.randomColors;

  customColorLiving.value = values.cellAliveColor;
  customColorDead.value = values.cellDeadColor;
}

function getInputValues() {
  return {
    simulationSpeed: speedInput.valueAsNumber,
    gridSize: gridSizeInput.valueAsNumber,
    cellSize: cellSizeInput.valueAsNumber,
    randomColors: randomColorCheckBox.checked,
    cellAliveColor: customColorLiving.value,
    cellDeadColor: customColorDead.value,
  };
}

export {
  // Gameplay buttons
  playBtn,
  pauseBtn,
  resetBtn,
  clearBtn,
  // Save / Load
  saveBtn,
  loadBtn,
  // Modal
  presetModal,
  presetModalBody,
  presetModalCloseElements,
  // Sim Speed
  speedInput,
  // Grid / Cell Sizing
  gridSizeInput,
  cellSizeInput,
  // Cell Color Controls
  randomColorCheckBox,
  customColorLiving,
  customColorDead,
  // Presets
  presetPulsar,
  // Function for preset usage
  overrideWithPresetValues,
  getInputValues,
};
