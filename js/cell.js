/**
 * A cell is an individual "pixel" with basic attributes
 * like width, height, colors for living state & deadstate.
 * In the future I'd like to add the ability to track how
 * many generations a cell lived before dieing.
 */
export default class Cell {
  constructor(width, height, liveColor, deadColor, isAlive) {
    this.width = width;
    this.height = height;
    this.liveColor = liveColor;
    this.deadColor = deadColor;
    this.isAlive = isAlive;
  }

  // Getter for living state
  get isAlive() {
    return this.isAlive;
  }

  // Draw cell onto canvas
  draw() {
    // TODO implement cell draw method
    // always draw cell, but draw with color
    // matching living state
  }

  // Kill the cell >:)
  kill() {
    this.isAlive = false;
  }

  // CONJURATION 100
  resurrect() {
    this.isAlive = true;
  }
}
