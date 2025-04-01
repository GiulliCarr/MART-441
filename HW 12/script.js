const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let obstacles = [];
let collectibles = [];


// playable shape
class Player {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.size = 30;
    this.speed = 4;
    this.dx = 0;
    this.dy = 0;
  }

  draw() {
    drawStar(ctx, this.x, this.y, 5, this.size / 2, this.size / 4, "#ffea00");
  }

  update() {
    const newX = this.x + this.dx;
    const newY = this.y + this.dy;

    if (!this.collidesWithObstacle(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  collidesWithObstacle(newX, newY) {
    return obstacles.some(ob => {
      return (
        newX < ob.x + ob.size &&
        newX + this.size > ob.x &&
        newY < ob.y + ob.size &&
        newY + this.size > ob.y
      );
    });
  }
}

// 3 collectibles
class Collectible {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.collected = false;
    }
  
    draw() {
      if (!this.collected) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#9effa9";
        ctx.fill();
      }
    }
  
    checkCollision(player) {
      if (this.collected) return false;
  
      const playerCenterX = player.x + player.size / 2;
      const playerCenterY = player.y + player.size / 2;
      const dx = playerCenterX - this.x;
      const dy = playerCenterY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < this.radius + player.size / 2) {
        this.collected = true;
        return true;
      }
      return false;
    }
  }
  

// 5 obstacles
class Obstacle {
  constructor(x, y, size, shape) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.shape = shape;
  }

  draw() {
    switch (this.shape) {
      case "triangle":
        drawTriangle(ctx, this.x, this.y, this.size, "#ffc759");
        break;
      case "square":
        ctx.fillStyle = "#ffc759";
        ctx.fillRect(this.x, this.y, this.size, this.size);
        break;
      case "circle":
        drawCircle(ctx, this.x, this.y, this.size / 2, "#ffc759");
        break;
      case "hexagon":
        drawHexagon(ctx, this.x, this.y, this.size / 2, "#ffc759");
        break;
      case "rhombus":
        drawRhombus(ctx, this.x, this.y, this.size, "#ffc759");
        break;
    }
  }
}

function drawStar(ctx, x, y, points, outer, inner, color) {
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / points;
  let cx = x + outer;
  let cy = y + outer;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outer);
  for (let i = 0; i < points; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
    rot += step;
  }
  ctx.lineTo(cx, cy - outer);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawTriangle(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x, y + size);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawHexagon(ctx, x, y, radius, color) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x_i = x + radius + radius * Math.cos(angle);
    const y_i = y + radius + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x_i, y_i);
    else ctx.lineTo(x_i, y_i);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRhombus(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x + size, y + size / 2);
  ctx.lineTo(x + size / 2, y + size);
  ctx.lineTo(x, y + size / 2);
  ctx.closePath();
  ctx.fill();
}

//put new array here

const player = new Player();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      player.dy = -player.speed;
      break;
    case "ArrowDown":
      player.dy = player.speed;
      break;
    case "ArrowLeft":
      player.dx = -player.speed;
      break;
    case "ArrowRight":
      player.dx = player.speed;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowUp", "ArrowDown"].includes(e.key)) player.dy = 0;
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) player.dx = 0;
});

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    obstacles.forEach(ob => ob.draw());
  
    collectibles.forEach(c => {
      if (c.checkCollision(player)) {
        score++;
      }
      c.draw();
    });
  
    player.update();
    player.draw();
  
    ctx.fillStyle = "#ffc759";
    ctx.font = "20px Raleway";
    ctx.fillText("Score: " + score, 10, 30);
  
    requestAnimationFrame(drawGame);
  }

  //collectibles and obstacle loading
  async function loadObstacles() {
    const res = await fetch("obstacles.json");
    const data = await res.json();
    data.forEach(obj => {
      obstacles.push(new Obstacle(obj.x, obj.y, obj.size, obj.shape));
    });
  }
  
  async function loadCollectibles() {
    const res = await fetch("collectibles.json");
    const data = await res.json();
    data.forEach(obj => {
      collectibles.push(new Collectible(obj.x, obj.y, obj.radius));
    });
  }
  Promise.all([loadObstacles(), loadCollectibles()]).then(() => {
    drawGame();
  });
  
  