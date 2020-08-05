/**
 * The grid class maintains a 2D array of cells and provides interface methods for:
 * 1. Cell presets
 * 2. Drawing to canvas
 * 3. Updating grid state
 * 4. Helper methods for the game algorithm
 */

import {
  gridSizeInput,
  cellSizeInput,
  randomColorCheckBox,
  customColorLiving,
  customColorDead,
} from "../IO/GameControls";
import Cell from "./Cell.js";

import { canvas } from "../Canvas/GameCanvas";
import { getRandomRGB } from "../Utils";

export default class Grid {
  constructor(preset = null) {
    this.state = [];

    this._initEventHandlers();

    this.generateUsingPreset(preset);
  }

  _initEventHandlers() {
    //* GRID & CELL INPUT HANDLERS
    gridSizeInput.addEventListener("change", () => {
      this.generateUsingRandom();
    });

    cellSizeInput.addEventListener("change", () => {
      this.generateUsingRandom();
    });

    //* COLOR INPUT HANDLERS
    randomColorCheckBox.addEventListener("change", (e) => {
      this.state.forEach((row) => {
        row.forEach((cell) => {
          if (e.target.checked) {
            cell.setLiveColor(getRandomRGB());
            cell.setDeadColor("black");
          } else {
            cell.setLiveColor(customColorLiving.value);
            cell.setDeadColor(customColorDead.value);
          }
        });
      });

      this.draw();
    });

    customColorLiving.addEventListener("change", (e) => {
      this.state.forEach((row) => {
        row.forEach((cell) => {
          cell.setLiveColor(customColorLiving.value);
          cell.setDeadColor(customColorDead.value);
        });
      });

      this.draw();
    });

    customColorDead.addEventListener("change", (e) => {
      this.state.forEach((row) => {
        row.forEach((cell) => {
          cell.setLiveColor(customColorLiving.value);
          cell.setDeadColor(customColorDead.value);
        });
      });

      this.draw();
    });
  }

  generateUsingPreset(preset) {
    /*
      If preset is not null:
        1. Clear grid state
        2. Set grid & cell parameters provided by preset
        3. Create grid according to preset array
      else:
        1. Generate a random grid

      Will draw new grid to canvas at the end
    */

    this.state = [];

    if (preset) {
      // Parameters
      this.width = Number(preset.gridWidth);
      this.height = Number(preset.gridHeight);

      this.cellWidth = Number(preset.cellWidth);
      this.cellHeight = Number(preset.cellHeight);

      canvas.width = this.width * this.cellWidth;
      canvas.height = this.height * this.cellHeight;

      // Grid generation
      for (let y = 0; y < this.height; y++) {
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
        this.state.push(row);
      }
    } else {
      this.generateUsingRandom();
    }

    this.draw();
  }

  generateUsingRandom() {
    /*
      1. Clear grid state
      2. Build grid & cell size from input values
      3. Size canvas accordingly
      4. Generate a grid using math.random
    */

    this.state = [];

    this.width = Number(gridSizeInput.value);
    this.height = Number(gridSizeInput.value);

    this.cellWidth = Number(cellSizeInput.value);
    this.cellHeight = Number(cellSizeInput.value);

    canvas.width = this.width * this.cellWidth;
    canvas.height = this.height * this.cellHeight;

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
            randomColorCheckBox.checked ? getRandomRGB() : customColorLiving.value,
            randomColorCheckBox.checked ? "#000000" : customColorDead.value,
            Math.floor(Math.random() * 1.4)
          )
        );
      }
      this.state.push(row);
    }

    this.draw();
  }

  update(newGridState, draw = true) {
    /*
      1. Takes in a 2D array of integers representing cell state (0 -> dead, 1 -> alive)
      2. Maps them to the cells in our grid state, killing or resurrecting the cells along the way
      3. If second optional draw parameter is enabled, then draw the cell as well
      4. Returns how many draw calls were made
    */

    // TODO Figure out why only drawing changed cells causes canvas to smear them across the screen :(

    let updates = 0;

    this.state.forEach((row, y) => {
      row.forEach((cell, x) => {
        // Only update cell if new state is different than current state
        if (cell.isAlive == 1 && newGridState[y][x] != 1) {
          cell.kill();
          updates++;

          if (draw) {
            cell.draw();
          }
        } else if (cell.isAlive == 0 && newGridState[y][x] != 0) {
          cell.resurrect();
          updates++;

          if (draw) {
            cell.draw();
          }
        }
      });
    });

    return updates;
  }

  reset() {
    // Kills all grid cells
    this.state.forEach((row) => {
      row.forEach((cell) => {
        cell.kill();
      });
    });
  }

  draw() {
    // Draws all grid cells
    this.state.forEach((row) => {
      row.forEach((cell) => {
        cell.draw();
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
      pos[0] < 0 ? (pos[0] = this.width - 1) : pos[0];

      // x is at end of grid ? -> wrap to beginning
      pos[0] === this.width ? (pos[0] = 0) : pos[0];

      // y is at top ? -> wrap to bottom
      pos[1] < 0 ? (pos[1] = this.height - 1) : pos[1];

      // y is at bottom ? -> wrap to top
      pos[1] === this.height ? (pos[1] = 0) : pos[1];

      const neighborCell = this.getCellAtIndex(pos[0], pos[1]);

      if (neighborCell.isAlive) {
        return (count += 1);
      } else {
        return count + 0;
      }
    }, 0);

    return neighbors;
  }

  getCellAtIndex(cellIndexX, cellIndexY) {
    // Simply returns cell at given x, y index
    return this.state[cellIndexY][cellIndexX];
  }

  getCellAtCoord(xCoord, yCoord) {
    /*
      1. Takes in screen coordinates
      2. Normalizes them to a cell index
      3. Returns cell from grid state matching that index 
    */

    const cellIndexX = Math.floor(xCoord / this.cellWidth);
    const cellIndexY = Math.floor(yCoord / this.cellHeight);

    return this.state[cellIndexY][cellIndexX];
  }
}
