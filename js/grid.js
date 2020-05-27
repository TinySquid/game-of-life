/**
 * The grid is an object that contains all the cells.
 * It has a defined width and height (in cells, not px)
 * and an initialState to support presets.
 */

import Cell from "./Cell.js";

export default class Grid {
  constructor(width, height, cellWidth, cellHeight, initialState = null) {
    this.width = width;
    this.height = height;

    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;

    if (initialState) {
      // TODO: Error checking (ensure initialState is a 2D array matching the width and height provided)
      this.state = initialState;
    } else {
      // Build grid with default preset
      this.state = [];

      for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
          row.push(new Cell(cellWidth, cellHeight));
        }
        this.state.push(row);
      }
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
