// indexDB wrapper
import Dexie from "dexie";

// Name generator for save function
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

// Used to capture canvas as image thumbnail for load list
import { canvas } from "../Canvas/GameCanvas";

// Input values to save
import { getInputValues } from "../IO/GameControls";

export default class SaveManager {
  constructor(gameInstance) {
    // Will pull grid from game class instance
    this.gameInstance = gameInstance;
  }

  save() {
    const saveName = uniqueNamesGenerator({ dictionaries: [colors, animals] });

    const inputValues = getInputValues();

    canvas.toBlob(
      (blob) => {
        console.log({
          name: saveName,
          thumbnail: URL.createObjectURL(blob),
          ...inputValues,
          grid: this.gameInstance.grid.state,
        });
      },
      "image/png",
      1
    );

    console.log(JSON.stringify(this.gameInstance.grid.state));
  }

  load() {}

  delete() {}
}
