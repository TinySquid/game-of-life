/**
 * A cell has basic attributes like width, height, position, colors for living state & deadstate.
 */

import { context } from "../Canvas/GameCanvas";

export default class Cell {
  constructor(width, height, x, y, liveColor, deadColor, isAlive = 0) {
    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.liveColor = liveColor;
    this.deadColor = deadColor;

    this.isAlive = isAlive;
  }

  draw() {
    // Determine draw color by cell state.
    if (this.isAlive && context.fillStyle !== this.liveColor) {
      context.fillStyle = this.liveColor;
    } else if (!this.isAlive && context.fillStyle !== this.deadColor) {
      context.fillStyle = this.deadColor;
    }

    context.fillRect(this.x, this.y, this.x + this.width, this.y + this.height);
  }

  //* Setters *//
  setLiveColor(newColor) {
    this.liveColor = newColor;
  }

  setDeadColor(newColor) {
    this.deadColor = newColor;
  }

  // Kill the cell >:)
  kill() {
    this.isAlive = 0;
  }

  // CONJURATION 100
  resurrect() {
    this.isAlive = 1;
  }
}
