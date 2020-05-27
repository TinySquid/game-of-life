/**
 * The grid is an object that contains all the cells.
 * It has a defined width and height (in cells, not px)
 * and an initialState to support presets.
 */

import Cell from "./Cell.js";

export default class Grid {
  constructor(preset) {
    this.width = preset.gridWidth;
    this.height = preset.gridHeight;

    this.cellWidth = preset.cellWidth;
    this.cellHeight = preset.cellHeight;

    // Build grid with preset
    this.state = [];

    for (let y = 0; y < this.height; y++) {
      let row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(new Cell(this.cellWidth, this.cellHeight, preset.liveColor, preset.deadColor, preset.cells[y][x]));
      }
      this.state.push(row);
    }
  }

  draw(context) {
    // For each row in each column, draw all cells
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Determine X, Y via index * cell size
        this.state[y][x].draw(context, x * this.cellWidth, y * this.cellHeight);
      }
    }
  }
}
