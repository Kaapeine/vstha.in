function setup() {
  createCanvas(windowWidth, windowHeight);
  let g = new Grid(100, 100);
}

function draw() {
  frameRate(60);
}

class Grid {
  constructor(nrows, ncols) {
    this.nrows = nrows;
    this.ncols = ncols;

    this.cellWidth = windowWidth / ncols;
    this.cellHeight = windowHeight / nrows;

    this.grid = [];

    for (let i = 0; i < this.nrows; i++) {
      let row = [];

      for (let j = 0; j < this.ncols; j++) {
        let x = i * this.cellWidth;
        let y = j * this.cellHeight;

        rect(x, y, this.cellWidth, this.cellHeight);
        row.push({
          x,
          y,
          value: noise(x, y),
        });
      }

      this.grid.push(row);
    }
  }
}
