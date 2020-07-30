
//* This will generate a grid in a JSON friendly format
// const gridFormat = {
//   width: 8,
//   height: 8,
//   liveColor: "white",
//   deadColor: "rgb(18, 18, 18)",
//   cells: this.state.map((y) => {
//     return y.map((x) => {
//       return x.isAlive ? 1 : false;
//     });
//   }),
// };

// console.log(JSON.stringify(gridFormat));

const blank = { 
  gridWidth: 100, 
  gridHeight: 100, 
  cellWidth:4, 
  cellHeight:4, 
  liveColor:"white", 
  deadColor:"black", 
  cells: (() => {
    // Really wish we could preinitialize arrays in JS...
    const columns = []
    for (let y = 0; y < 100; y++){
      const row = [];
      for (let x = 0; x < 100; x++){
        row.push(0)
      }
      columns.push(row)
    }

    return columns;
  })()
};

// a null value will make the grid randomize itself 
const random = null;

module.exports = {
  blank: blank,
  random: random
}