var G;
var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  G = new Grid(100, 100, (isSquare = true));
  [...Array(100)].map((i) => {
    particles.push(new Particle());
  });
}

function draw() {
  frameRate(60);
  // G.show();
  G.update();

  particles.forEach((p) => {
    p.show();
    p.applyField(G);
  });
}

class Particle {
  constructor() {
    this.offset = 200;
    this.size = 100;
    this.t = 0;
    this.rate = 0.1;

    this.resetPosition();
  }

  resetPosition() {
    this.x = random(-this.offset, width + this.offset);
    this.y = random(-this.offset, height + this.offset);
  }

  show() {
    colorMode('HSB');
    noStroke();
    fill(90 * noise(this.x, this.y, this.t), 50, 100);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += noise(this.x);
    this.y += noise(this.y);
  }

  applyField(g) {
    let i = floor(this.x / g.cellWidth);
    let j = floor(this.y / g.cellHeight);

    if (this.x < 0 || this.x >= width || this.y < 0 || this.y >= height) {
      this.resetPosition();
      return;
    }

    let update = g.grid[i][j];
    this.x += update.vx;
    this.y += update.vy;

    this.t += this.rate;
  }
}

class Grid {
  constructor(nrows, ncols, isSquare) {
    this.nrows = nrows;
    this.ncols = ncols;

    this.cellWidth = windowWidth / ncols;
    this.cellHeight = windowHeight / nrows;

    if (isSquare) {
      this.cellHeight = this.cellWidth;
    }

    this.grid = [];

    this.t = 0;
    this.rate = 0.1;
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.nrows; i++) {
      let row = [];

      for (let j = 0; j < this.ncols; j++) {
        let x = i * this.cellWidth;
        let y = j * this.cellHeight;

        row.push({
          x,
          y,
          vx: noise(x, this.t),
          vy: noise(y, this.t),
        });

        this.grid.push(row);
      }
    }
  }

  show() {
    for (let i = 0; i < this.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.ncols; j++) {
        let x = i * this.cellWidth;
        let y = j * this.cellHeight;

        colorMode('HSB');
        fill(120, 100 * noise(x, y, this.t), 50);
        rect(x, y, this.cellWidth, this.cellHeight);
      }
    }
  }

  update() {
    this.t += this.rate;
  }
}
