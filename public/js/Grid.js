/**
 * The grid is an object that contains all the cells.
 * It has a defined width and height (in cells, not px)
 * and an initialState to support presets.
 */

import Cell from "./Cell.js";
import { context } from "./canvas";

export default class Grid {
  constructor(preset = null) {
    this.state = [];

    if (preset) {
      this.width = preset.gridWidth;
      this.height = preset.gridHeight;

      this.cellWidth = preset.cellWidth;
      this.cellHeight = preset.cellHeight;

      this.generatePreset(preset);
    } else {
      this.width = 50;
      this.height = 50;

      this.cellWidth = 8;
      this.cellHeight = 8;

      this.generateRandom();
    }

    // console.log(this.cellPositions)
    //* This will generate a grid in a JSON friendly format
    // const gridFormat = {
    //   width: 8,
    //   height: 8,
    //   liveColor: "white",
    //   deadColor: "black",
    //   cells: this.state.map((y) => {
    //     return y.map((x) => {
    //       return x.isAlive ? 1 : false;
    //     });
    //   }),
    // };
    // console.log(JSON.stringify(gridFormat));
  }

  generatePreset(preset) {
    this.state = [];

    for (let y = 0; y < this.height; y++) {
      // Assemble each row
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(
          new Cell(
            this.cellWidth,
            this.cellHeight,
            x * this.cellWidth,
            y * this.cellHeight,
            preset.liveColor,
            preset.deadColor,
            preset.cells[y][x]
          )
        );
      }
      // state[y] will return a row array [x]
      // state[y][x]
      this.state.push(row);
    }
  }

  generateRandom() {
    this.state = [];

    for (let y = 0; y < this.height; y++) {
      // Assemble each row
      const row = [];
      for (let x = 0; x < this.width; x++) {
        row.push(
          new Cell(
            this.cellWidth,
            this.cellHeight,
            x * this.cellWidth,
            y * this.cellHeight,
            "white",
            "black",
            Math.floor(Math.random() * (1.4 - 0))
          )
        );
      }
      this.state.push(row);
    }
  }

  update(newGridState) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.state[y][x].isAlive = newGridState[y][x];
      }
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

  draw() {
    // For each row in each column, draw all cells
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // Determine X, Y via index * cell size
        this.state[y][x].draw(context, x * this.cellWidth, y * this.cellHeight);
      }
    }
  }

  getCellNeighbors(x, y) {
    // Takes in the coord of the cell and then
    // returns an array of each position around
    // the cell, with 1 being a live cell, 0 dead
    /*
    Pattern ->
      0 1 2
      3 s 4
      5 6 7
      
      # = grid position
      s = current cell

      array returned follows the grid cell number 

      Also handles edge of map by wrapping-around
    */
    const searchArea = [
      [x - 1, y - 1], //Top left
      [x, y - 1], // Top middle
      [x + 1, y - 1], // Top right
      [x - 1, y], // Left
      [x + 1, y], // Right
      [x - 1, y + 1], // Bottom left
      [x, y + 1], // Bottom center
      [x + 1, y + 1], // Bottom right
    ];

    const cellCount = searchArea.reduce((count, pos) => {
      // Check if search pos is out of bounds and if so
      // wrap around grid to other side
      // pos[0] -> x, pos[1] -> y
      // count -> Total # of living cells surrounding us
      // x = 0 ? -> wrap to end of grid
      pos[0] < 0 ? (pos[0] = this.width - 1) : pos[0];
      // x is at end of grid ? -> wrap to beginning
      pos[0] === this.width ? (pos[0] = 0) : pos[0];
      // y is at top ? -> wrap to bottom
      pos[1] < 0 ? (pos[1] = this.height - 1) : pos[1];
      // y is at bottom ? -> wrap to top
      pos[1] === this.height ? (pos[1] = 0) : pos[1];

      // If a cell is alive
      const neighborCell = this.getCellAtIndex(pos[0], pos[1]);

      if (neighborCell.isAlive) {
        return (count += 1);
      } else {
        return count + 0;
      }
    }, 0);

    return cellCount;
  }

  getCellAtIndex(x, y) {
    // Return cell at index
    return this.state[y][x];
  }

  getCellAtCoord(x, y) {
    /* This will return the cell at the position
    specified by the mouse x / y, normalized to
    the canvas and the grid cell width / height.
    */

    // Convert mouse coord to grid cell indexes
    const baseX = Math.floor(x / this.cellWidth);
    const baseY = Math.floor(y / this.cellHeight);

    return this.state[baseY][baseX];
  }
}
