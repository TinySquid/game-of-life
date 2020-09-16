function emptyGrid(size) {
  return new Array(size).fill(new Array(size).fill(0));
}

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
