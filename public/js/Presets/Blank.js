//* This preset exists as an example of what is required to make your own preset
//* Also see 'Presets.js' to view how to import a preset into the main presets object

// Generates a 2D array of size pre-filled with 0s
function emptyGrid(size) {
  return new Array(size).fill(new Array(size).fill(0));
}

// Preset template object
// You need these key names if you want to make your own
const blankPreset = {
  simulationSpeed: 250,
  gridSize: 35,
  cellSize: 16,
  randomColors: true,
  cellAliveColor: "#000000",
  cellDeadColor: "#000000",
};

// Add after to get access to obj props
blankPreset.grid = emptyGrid(blankPreset.gridSize);

export default blankPreset;
