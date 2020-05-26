/**
 * A cell is an individual "pixel" with basic attributes
 * like width, height, colors for living state & deadstate.
 * In the future I'd like to add the ability to track how
 * many generations a cell lived before dieing.
 */
class Cell {
  constructor(width, height, liveColor, deadColor) {
    this.width = width;
    this.height = height;
    this.liveColor = liveColor;
    this.deadColor = deadColor;
  }
}
