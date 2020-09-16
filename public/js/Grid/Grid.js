/**
 * The grid class maintains a 2D array of cell "states" and provides interface methods for:
 * 1. Generating a grid from presets
 * 2. Reset / Clear / Update / Draw methods
 * 3. Getting individual cells and cell neighbors for the game logic to use
 *
 * Has event handlers for control input changes (sizing / colors)
 */

import {
  gridSizeInput,
  cellSizeInput,
  randomColorCheckBox,
  customColorLiving,
  customColorDead,
} from "../IO/GameControls";

import { canvas, context } from "../Canvas/GameCanvas";
import { getRandomRGB } from "../utils.js";

export default class Grid {
  constructor(preset = null) {
    // Tracks cell state for each position on the grid
    this.state = [];

    this.generateUsingPreset(preset);
  }

  generateUsingPreset(preset) {
    /*
      If preset is not null:
        1. Set grid & cell parameters provided by preset
        2. Set grid state to preset cell array
      else:
        1. Generate a random grid

      Will draw new grid to canvas at the end
    */

    if (preset) {
      // Parse parameters
      this.gridSize = preset.gridSize;

      this.cellSize = preset.cellSize;

      if (preset.randomColors) {
        // In this case only cellDeadColor is a valid prop - cellAliveColor will be undefined
        this.randomColors = true;
        this.cellDeadColor = preset.cellDeadColor;
      } else {
        // Pull values from cellAliveColor & cellDeadColor props
        this.randomColors = false;
        this.cellAliveColor = preset.cellAliveColor;
        this.cellDeadColor = preset.cellDeadColor;
      }

      // Canvas sized to fit grid
      canvas.width = canvas.height = this.gridSize * this.cellSize;

      this.state = this._deepCopy(preset.grid);

      this.draw();
    } else {
      this.generateUsingRandomPreset();
    }
  }

  generateUsingRandomPreset() {
    /*
      1. Build grid & cell size from input values
      2. Size canvas accordingly
      3. Generate a grid using math.random
      4. Draw to canvas
    */

    this.gridSize = Number(gridSizeInput.value);

    this.cellSize = Number(cellSizeInput.value);

    this.randomColors = false;

    // Default colors
    this.cellAliveColor = customColorLiving.value;
    this.cellDeadColor = customColorDead.value;

    canvas.width = canvas.height = this.gridSize * this.cellSize;

    this.state = [];

    // Generate grid
    for (let y = 0; y < this.gridSize; y++) {
      const row = [];
      for (let x = 0; x < this.gridSize; x++) {
        row[x] = Math.floor(Math.random() * 1.4);
      }
      this.state.push(row);
    }

    this.draw();
  }

  update(grid) {
    this.state = this._deepCopy(grid);

    this.draw();
  }

  reset() {
    this.generateUsingRandomPreset();
  }

  clear() {
    this.state = [];

    for (let y = 0; y < this.gridSize; y++) {
      const row = [];

      for (let x = 0; x < this.gridSize; x++) {
        row.push(0);
      }

      this.state.push(row);
    }

    this.draw();
  }

  draw() {
    this.state.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 0) {
          // Dead
          context.fillStyle = this.cellDeadColor;
          context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        } else {
          context.fillStyle = this.randomColors ? getRandomRGB() : this.cellAliveColor;
          context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      });
    });
  }

  getCellNeighbors(x, y) {
    /*
      1. Takes in cell index
      2. Finds all living cells around it (wrapping for grid borders)
      3. Returns count

      Search Area Pattern ->
        n n n
        n c n
        n n n

        n = grid position
        c = current cell
    */

    const searchArea = [
      [x - 1, y - 1], //Top left
      [x, y - 1], // Top middle
      [x + 1, y - 1], // Top right
      [x - 1, y], // Left
      [x + 1, y], // Right
      [x - 1, y + 1], // Bottom left
      [x, y + 1], // Bottom middle
      [x + 1, y + 1], // Bottom right
    ];

    const neighbors = searchArea.reduce((count, pos) => {
      /*
        pos[0] = cell index x, pos[1] = cell index y
        count -> Total num of living neighbors
        When checking cells at grid edges, wrap search pattern
      */

      // x is at beginning of grid ? -> wrap to end
      pos[0] < 0 ? (pos[0] = this.gridSize - 1) : pos[0];

      // x is at end of grid ? -> wrap to beginning
      pos[0] === this.gridSize ? (pos[0] = 0) : pos[0];

      // y is at top ? -> wrap to bottom
      pos[1] < 0 ? (pos[1] = this.gridSize - 1) : pos[1];

      // y is at bottom ? -> wrap to top
      pos[1] === this.gridSize ? (pos[1] = 0) : pos[1];

      const neighborCell = this.getCellAtIndex(pos[0], pos[1]);

      if (neighborCell === 1) {
        // Living neighbor
        return (count += 1);
      } else {
        // Dead neighbor
        return count + 0;
      }
    }, 0);

    // Total count of living neighbors
    return neighbors;
  }

  getCellAtIndex(x, y) {
    // Simply returns cell at given x, y index
    return this.state[y][x];
  }

  toggleCell(x, y) {
    // Using Number to prevent changing type to bool
    this.state[y][x] = Number(!this.state[y][x]);

    // Re-draw canvas
    this.draw();
  }

  _deepCopy(grid) {
    // Copies by value into a new array
    const newGrid = [];

    grid.forEach((gridRow) => {
      const newRow = [];

      gridRow.forEach((gridCell) => {
        newRow.push(gridCell);
      });

      newGrid.push(newRow);
    });

    return newGrid;
  }
}
