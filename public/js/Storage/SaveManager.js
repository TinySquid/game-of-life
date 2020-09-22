// Name generator for save function
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

// Used to capture canvas as image thumbnail for load list
import { canvas } from "../Canvas/GameCanvas";

// Input values to save
import { presetModal, presetModalBody, presetModalCloseElements, getInputValues } from "../IO/GameControls";

// Database funcs
import indexDB from "./db";

export default class SaveManager {
  constructor(gameInstance) {
    // Will pull grid from game class instance
    this.gameInstance = gameInstance;

    // Close modal when clicking outside it
    window.addEventListener("click", (e) => {
      if (e.target === presetModal) presetModal.style.display = "none";
    });

    // Close modal
    for (const element of presetModalCloseElements) {
      element.addEventListener("click", (e) => {
        presetModal.style.display = "none";
      });
    }
  }

  save() {
    const saveName = uniqueNamesGenerator({ dictionaries: [colors, animals] });

    const inputValues = getInputValues();

    // Render canvas as image to be used as a thumbnail later
    canvas.toBlob(
      (blob) => {
        // Store preset and image into db
        indexDB.presets.put({
          name: saveName,
          thumbnail: blob,
          ...inputValues,
          grid: this.gameInstance.grid.state,
        });
      },
      "image/png",
      1
    );

    alert(`Custom preset saved as ${saveName}!`);
  }

  // Load a clicked preset
  load(preset) {
    presetModal.style.display = "none";

    this.gameInstance.usePreset(preset);
  }

  // Delete a trashed preset
  delete(id) {
    indexDB.presets
      .delete(id)
      .then(() => {
        this.getSavedPresets();
      })
      .catch((error) => {
        alert(`An error occured while trying to delete preset: ${error}`);
      });
  }

  // Used by load button to prompt with modal
  openModal() {
    this.getSavedPresets()
      .then((result) => {
        if (result) {
          presetModal.style.display = "block";
        } else {
          alert("No saved presets found.");
        }
      })
      .catch((error) => {
        // Hide modal and present error
        presetModal.style.display = "none";

        alert(`An error occured: ${error}`);
      });
  }

  //* Loads presets from DB and appends cards for each into modal body
  //* returns promise with true/false if there were presets loaded
  getSavedPresets() {
    // Clear any previous elements in modal body
    this.clearPresets();

    // Get saved presets from DB
    return indexDB.presets
      .toArray()
      .then((presets) => {
        // Send null to next handler when no cards will be made
        if (presets.length === 0) return null;

        // Otherwise continue and build a fragment with cards for each preset
        const cards = document.createDocumentFragment();

        presets.forEach((preset) => {
          // Sorry no IE garbage allowed here
          const template = document.createElement("template");

          // Card component
          template.innerHTML = `
          <div class="preset-card">
            <img src=${URL.createObjectURL(preset.thumbnail)} alt="Thumbnail" class="preset-img"/>
            <div class="preset-info">
                <h1 class="preset-title">${preset.name}</h1>

                <span>Grid Size: ${preset.gridSize}</span>
                <span>Cell Size: ${preset.cellSize}</span>  
            </div>
            <span class="preset-delete">&times;</span>
          </div>
          `.trim();

          // Give card a click event handler for load / delete
          template.content.firstChild.addEventListener("click", (e) => {
            if (e.target.className === "preset-delete") {
              // Delete icon clicked so delete the preset
              this.delete(preset.id);
            } else {
              // Load the clicked preset
              this.load(preset);
            }
          });

          cards.appendChild(template.content.firstChild);
        });

        return cards;
      })
      .then((cards) => {
        // Return success of operation
        if (cards) {
          // Add cards to modal body
          presetModalBody.appendChild(cards);

          return true;
        }
        return false;
      });
  }

  // Will clear preset cards to prep for re-render of new list
  clearPresets() {
    while (presetModalBody.firstChild) {
      presetModalBody.removeChild(presetModalBody.lastChild);
    }
  }
}
