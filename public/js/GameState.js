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
        if (this.state === STATE.PLAYING) {
          this.state = newState;
        }
        break;
      }
      case STATE.PLAYING: {
        if (this.state === STATE.PAUSED || this.state === STATE.STOPPED || this.state === STATE.IDLE) {
          this.state = newState;
        }
        break;
      }
      case STATE.STOPPED: {
        if (this.state === STATE.PLAYING || this.state === STATE.PAUSED) {
          this.state = newState;
        }
        break;
      }
      case STATE.IDLE: {
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
