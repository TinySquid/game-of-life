function emptyGrid(width, height) {
  return new Array(width).fill(new Array(height).fill(0));
}

const blankPreset = {
  gridWidth: 50,
  gridHeight: 50,
  cellWidth: 16,
  cellHeight: 16,
  liveColor: "white",
  deadColor: "black",
};

// Add after to get access to obj props
blankPreset.cells = emptyGrid(blankPreset.gridWidth, blankPreset.gridHeight);

export default blankPreset;
