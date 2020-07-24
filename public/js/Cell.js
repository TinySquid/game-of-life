/**
 * A cell has basic attributes like width, height, position, colors for living state & deadstate.
 */
import { context } from "./canvas";

export default class Cell {
  constructor(width, height, x, y, liveColor, deadColor, isAlive = false) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.liveColor = liveColor;
    this.deadColor = deadColor;

    this.isAlive = isAlive;

    // Metrics
    this.survivedGenerations = 0;
  }

  // Draw cell onto canvas
  draw() {
    // Determine color by state
    if (this.isAlive) {
      // Yay we lived another generation!
      this.survivedGenerations++;
      context.fillStyle = this.liveColor;
    } else {
      context.fillStyle = this.deadColor;
    }

    context.fillRect(this.x, this.y, this.x + this.width, this.y + this.height);
  }

  // Kill the cell >:)
  kill() {
    this.isAlive = false;
    this.survivedGenerations = 0;
  }

  // CONJURATION 100
  resurrect() {
    this.isAlive = true;
  }
}
