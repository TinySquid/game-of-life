/*
  Access the canvas or context object when needed by importing this file
*/

const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

module.exports = {
  canvas,
  context,
};
