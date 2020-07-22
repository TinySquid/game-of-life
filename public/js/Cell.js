/**
 * A cell is an individual "pixel" with basic attributes
 * like width, height, colors for living state & deadstate.
 * In the future I'd like to add the ability to track how
 * many generations a cell lived before dying.
 */
export default class Cell {
  constructor(width = 8, height = 8, liveColor = "white", deadColor = "rgb(18, 18, 18)", isAlive = false) {
    this.width = width;
    this.height = height;
    this.liveColor = liveColor;
    this.deadColor = deadColor;
    this.isAlive = isAlive;
    this.survivedGenerations = 0;
  }

  // Draw cell onto canvas
  draw(context, x, y) {
    // Determine color by state
    if (this.isAlive) {
      // Yay we lived another generation!
      this.survivedGenerations++;
      context.fillStyle = this.liveColor;
    } else {
      context.fillStyle = this.deadColor;
    }

    // Draw to context
    context.fillRect(x, y, x + this.width, y + this.height);
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