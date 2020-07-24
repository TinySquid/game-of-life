function getRandomRGB() {
  // Generates a 24bit number and uses each 8 bit section for r, g, b
  // https://stackoverflow.com/a/23095731
  const value = Math.round(0xffffff * Math.random());
  const r = value >> 16;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

module.exports = {
  getRandomRGB,
};
