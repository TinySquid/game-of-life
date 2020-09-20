# Conway's Game of Life

John Conway's "Game of Life" is a computer science classic from 1970. It's a program that simulates a cellular automaton, and has connections to all kinds of different aspects of computer science and nature.

## Rules of the Game

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.

- Any live cell with two or three live neighbours survives.
- Any dead cell with three live neighbours becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Deployed App

[Click to go to live game](https://mike-gol.netlify.app/)

## Deploy App Locally

1. Clone this repo
2. Use yarn or npm to install required packages
3. Pick one of the options below

A. If you want to run in dev mode (live server + watcher) then use `yarn dev` or `npm run dev`. A server will then host on http://localhost:5000 from the `/dist/dev` folder.

B. If you want to build the app then use `yarn build` or `npm run build`. The resulting build will be in the `/dist/production` folder.

## GIF Showcase

Showing a couple of the features (color changing, reset, custom drawing with mouse)
![Demo of gameplay](/docs/img/presentation-a.gif)

Demo of the save / load system
![Demo of the save / load mechanic](/docs/img/presentation-b.gif)

300 x 300 grid of 2x2 cells with some decent performance (algorithm is still O(n^2) currently)
![Demo of large board & small cell size](/docs/img/presentation-c.gif)

## Examples of Emergent Patterns

![Example Patterns](/docs/img/patterns.gif)

## Future plans

- ~~Get presets implemented and add a few more to play around with~~ -> \*Done-ish (presets working but only 1 exists as an example)
- ~~Refactor save/load system (ultimately will require some refactoring of the Grid class as well)~~ -> Done!
  - ~~Maybe switch to using indexDB to store saved presets instead of saving to file?~~ -> Done! (Using Dexie)
- Darkmode because who doesn't love it?
- Refactor styling and make app mobile friendly...
- Refactor logic to be O(n) where n is the number of "changed" cells only. Right now it bruteforces the whole grid O(n^2). Previous attempts at re-rendering changed cells only caused weird canvas bugs that made cells stretch across the screen for some reason.
