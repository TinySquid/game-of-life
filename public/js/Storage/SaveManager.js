// Name generator for save function
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

// Canvas to capture as image thumbnail
import { canvas } from "../Canvas/GameCanvas";

// Inputs
import { saveBtn, loadBtn, getInputValuesForSave } from "../IO/GameControls";

export default class SaveManager {
  constructor(gameInstance) {
    // Will pull grid from game class instance
    this.gameInstance = gameInstance;

    this._initEventHandlers();
  }

  _initEventHandlers() {
    saveBtn.addEventListener("click", (e) => {
      this.save();
    });

    loadBtn.addEventListener("click", (e) => {
      this.load();
    });
  }

  save() {
    const saveName = uniqueNamesGenerator({ dictionaries: [colors, animals] });

    const inputValues = getInputValuesForSave();

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
  }

  load() {}

  delete() {}
}
