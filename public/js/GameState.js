export const STATE = {
  PAUSED: 0,
  PLAYING: 1,
  STOPPED: 2,
  IDLE: 3,
};

export class StateMachine {
  constructor() {
    this.state = STATE.IDLE;
  }

  transitionTo(newState) {
    switch (newState) {
      case STATE.PAUSED: {
        // Can only pause if we are currently in play state
        if (this.state === STATE.PLAYING) {
          this.state = newState;
        }
        break;
      }
      case STATE.PLAYING: {
        // Can play from basically any state
        if (this.state === STATE.PAUSED || this.state === STATE.STOPPED || this.state === STATE.IDLE) {
          this.state = newState;
        }
        break;
      }
      case STATE.STOPPED: {
        // Can stop only if we are playing or paused (stop clears the board, whereas pause does not)
        if (this.state === STATE.PLAYING || this.state === STATE.PAUSED) {
          this.state = newState;
        }
        break;
      }
      case STATE.IDLE: {
        /*
        The only time the state moves from any other state back to idle is when we are stopped, this way we clear the board and wait for a new state
        */
        if (this.state === STATE.STOPPED) {
          this.state = newState;
        }
        break;
      }
      default:
        console.log(`Cannot change state from ${this.state} to ${newState}`);
        break;
    }
  }
}
