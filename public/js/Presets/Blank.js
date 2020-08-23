const blankPreset = {
  gridWidth: 50,
  gridHeight: 50,
  cellWidth: 16,
  cellHeight: 16,
  liveColor: "white",
  deadColor: "black",
  cells: (() => {
    // Really wish we could preinitialize arrays in JS...
    const columns = [];
    for (let y = 0; y < 100; y++) {
      const row = [];
      for (let x = 0; x < 100; x++) {
        row.push(0);
      }
      columns.push(row);
    }

    return columns;
  })(),
};

export default blankPreset;
