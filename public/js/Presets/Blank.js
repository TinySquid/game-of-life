function emptyGrid(size) {
  return new Array(size).fill(new Array(size).fill(0));
}

const blankPreset = {
  gridSize: 30,
  cellSize: 16,
  cellAliveColor: "white",
  cellDeadColor: "black",
};

// Add after to get access to obj props
blankPreset.grid = emptyGrid(blankPreset.gridSize);

export default blankPreset;
