const generationCounter = document.getElementById("generation-counter");

function updateCounter(generation) {
  generationCounter.textContent = `Generation: ${generation}`;
}

module.exports = {
  generationCounter,
  updateCounter,
};
