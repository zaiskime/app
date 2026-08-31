// Snake reward mini game — launched after a successful round.
// Player controls a snake to eat food and grow. Arrow keys or on-screen buttons.

const SnakeGame = (function () {
  const GRID_SIZE = 15;
  const CELL_SIZE = 18;
  const INITIAL_SPEED = 180;
  const SPEED_INCREMENT = 5;
  const MIN_SPEED = 80;

  let canvas = null;
  let ctx = null;
  let containerEl = null;
  let statusEl = null;
  let scoreEl = null;
  let snake = [];
  let food = null;
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let gameLoop = null;
  let score = 0;
  let speed = INITIAL_SPEED;
  let gameActive = false;
  let particles = [];

  function init(parent) {
    containerEl = document.createElement("div");
    containerEl.className = "snake-game";

    const title = document.createElement("p");
    title.className = "snake-title";
    title.textContent = "🐍 Žasė — laimėjimo prizas!";
    containerEl.appendChild(title);

    const header = document.createElement("div");
    containerEl.appendChild(header);

    statusEl = document.createElement("span");
    statusEl.className = "snake-status";
    statusEl.textContent = "Naudok rodyklės arba mygtukus";
    header.appendChild(statusEl);

    scoreEl = document.createElement("span");
    scoreEl.className = "snake-score";
    scoreEl.textContent = "0";
    header.appendChild(scoreEl);

    canvas = document.createElement("canvas");
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;
    canvas.className = "snake-canvas";
    containerEl.appendChild(canvas);
    ctx = canvas.getContext("2d");

    const controls = document.createElement("div");
    controls.className = "snake-controls";

    const upBtn = createControlButton("⬆️", { x: 0, y: -1 });
    const leftBtn = createControlButton("⬅️", { x: -1, y: 0 });
    const downBtn = createControlButton("⬇️", { x: 0, y: 1 });
    const rightBtn = createControlButton("➡️", { x: 1, y: 0 });

    controls.appendChild(upBtn);
    controls.appendChild(leftBtn);
    controls.appendChild(downBtn);
    controls.appendChild(rightBtn);
    containerEl.appendChild(controls);

    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn--secondary btn--small";
    resetBtn.textContent = "Žaisti iš naujo";
    resetBtn.style.marginTop = "12px";
    resetBtn.addEventListener("click", start);
    containerEl.appendChild(resetBtn);

    parent.appendChild(containerEl);

    document.addEventListener("keydown", handleKeydown);
    start();
  }

  function createControlButton(label, dir) {
    const btn = document.createElement("button");
    btn.className = "snake-btn";
    btn.textContent = label;
    btn.addEventListener("click", () => setDirection(dir));
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      setDirection(dir);
    });
    return btn;
  }

  function handleKeydown(e) {
    const keyMap = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      setDirection(keyMap[e.key]);
    }
  }

  function setDirection(dir) {
    if (!gameActive) return;
    if (dir.x === -direction.x && dir.y === -direction.y) return;
    nextDirection = dir;
  }

  function start() {
    snake = [
      { x: 5, y: 7 },
      { x: 4, y: 7 },
      { x: 3, y: 7 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    speed = INITIAL_SPEED;
    gameActive = true;
    scoreEl.textContent = "0";
    statusEl.textContent = "Naudok rodyklės arba mygtukus";
    statusEl.classList.remove("snake-status--dead");
    placeFood();

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(tick, speed);
  }

  function placeFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function tick() {
    direction = nextDirection;
    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return die();
    }

    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      return die();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      spawnParticles(head.x, head.y);
      if (snake.length >= GRID_SIZE * GRID_SIZE) {
        return win();
      }
      placeFood();
      if (speed > MIN_SPEED) {
        speed -= SPEED_INCREMENT;
        clearInterval(gameLoop);
        gameLoop = setInterval(tick, speed);
      }
    } else {
      snake.pop();
    }

    draw();
  }

  function spawnParticles(gx, gy) {
    const cx = gx * CELL_SIZE + CELL_SIZE / 2;
    const cy = gy * CELL_SIZE + CELL_SIZE / 2;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("div");
      p.className = "snake-particle";
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      const angle = (Math.PI * 2 * i) / 6;
      const dist = 20 + Math.random() * 15;
      p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      p.style.background = i % 2 === 0 ? "var(--c-sun)" : "var(--c-cherry)";
      containerEl.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  }

  function draw() {
    ctx.fillStyle = "#FBF3E3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#EFE1C2";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    ctx.fillStyle = "#D14B3F";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    snake.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = isHead ? "#4C8C5B" : "#5FA86F";
      const pad = isHead ? 1 : 2;
      const r = isHead ? 5 : 3;
      roundRect(
        ctx,
        seg.x * CELL_SIZE + pad,
        seg.y * CELL_SIZE + pad,
        CELL_SIZE - pad * 2,
        CELL_SIZE - pad * 2,
        r
      );
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }

  function die() {
    gameActive = false;
    clearInterval(gameLoop);
    statusEl.textContent = `💀 Baigi! Taškai: ${score}`;
    statusEl.classList.add("snake-status--dead");
    draw();
  }

  function win() {
    gameActive = false;
    clearInterval(gameLoop);
    statusEl.textContent = `🏁 Tu laimėjai! Pilnas laukas!`;
    statusEl.classList.remove("snake-status--dead");
  }

  function destroy() {
    if (gameLoop) clearInterval(gameLoop);
    document.removeEventListener("keydown", handleKeydown);
  }

  function render(parent) {
    init(parent);
  }

  return { render, destroy };
})();
