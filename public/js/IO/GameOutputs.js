const generationCounter = document.getElementById("generation-counter");
const generationPopulation = document.getElementById("generation-population");
const generationDensity = document.getElementById("generation-density");

function updateCounter(generation) {
  generationCounter.textContent = `Generation: ${generation}`;
}

function updatePopulation(population) {
  generationPopulation.textContent = `Population: ${population}`;
}

function updateDensity(gridState, gridSize, cellSize) {
  //TODO Implement
}

export {
  // DOM elements
  generationCounter,
  generationPopulation,
  generationDensity,
  // Mutators
  updateCounter,
  updatePopulation,
  updateDensity,
};
