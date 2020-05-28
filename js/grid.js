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
    this.cellPositions = {};

    for (let y = 0; y < this.height; y++) {
      const row = [];
      for (let x = 0; x < this.width; x++) {
        // This adds a new cell to the grid state
        row.push(new Cell(this.cellWidth, this.cellHeight, preset.liveColor, preset.deadColor, preset.cells[y][x]));
        // This adds the same cell to an object that maps xy coords to state xy indices
        this.cellPositions[`${y}${x}`] = [y, x];
      }
      this.state.push(row);
    }
  }

  reset() {
    // Clear the grid (kill all the cells)
    this.state.forEach((col) => {
      col.forEach((cell) => {
        cell.kill();
      });
    });
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

  getCellAt(x, y) {
    /* This will return the cell at the position
    specified by the mouse x / y, normalized to
    the canvas and the grid cell width / height.
    */

    // Convert mouse coord to grid cell coords
    const baseX = Math.floor(x / this.cellWidth);
    const baseY = Math.floor(y / this.cellHeight);

    // Get cell index encoded by cellPositions hashtable
    const cellIndex = this.cellPositions[`${baseY}${baseX}`];

    // Get the cell at state column and row index
    const cell = this.state[cellIndex[0]][cellIndex[1]];

    return cell;
  }
}
