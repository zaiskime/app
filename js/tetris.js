// Tetris reward mini game — launched after a successful round.
// Classic falling blocks puzzle. Arrow keys or on-screen buttons.

const TetrisGame = (function () {
  const COLS = 10;
  const ROWS = 16;
  const CELL_SIZE = 16;
  const INITIAL_SPEED = 500;
  const SPEED_INCREMENT = 30;
  const MIN_SPEED = 150;

  const PIECES = [
    { shape: [[1,1,1,1]], color: "#4FA3C4" },
    { shape: [[1,1],[1,1]], color: "#F2A93B" },
    { shape: [[0,1,0],[1,1,1]], color: "#8B6BB5" },
    { shape: [[1,0,0],[1,1,1]], color: "#D4915E" },
    { shape: [[0,0,1],[1,1,1]], color: "#D14B3F" },
    { shape: [[1,1,0],[0,1,1]], color: "#4C8C5B" },
    { shape: [[0,1,1],[1,1,0]], color: "#E88CA5" }
  ];

  let canvas = null;
  let ctx = null;
  let containerEl = null;
  let statusEl = null;
  let scoreEl = null;
  let linesEl = null;
  let board = [];
  let currentPiece = null;
  let pieceX = 0;
  let pieceY = 0;
  let gameLoop = null;
  let score = 0;
  let lines = 0;
  let speed = INITIAL_SPEED;
  let gameActive = false;

  function init(parent) {
    containerEl = document.createElement("div");
    containerEl.className = "tetris-game";

    const title = document.createElement("p");
    title.className = "tetris-title";
    title.textContent = "🧱 Tetris — laimėjimo prizas!";
    containerEl.appendChild(title);

    const header = document.createElement("div");
    containerEl.appendChild(header);

    statusEl = document.createElement("span");
    statusEl.className = "tetris-status";
    statusEl.textContent = "Naudok rodyklės arba mygtukus";
    header.appendChild(statusEl);

    const stats = document.createElement("span");
    stats.className = "tetris-stats";
    scoreEl = document.createElement("span");
    scoreEl.textContent = "0";
    linesEl = document.createElement("span");
    linesEl.textContent = "0";
    stats.appendChild(document.createTextNode("Taškai: "));
    stats.appendChild(scoreEl);
    stats.appendChild(document.createTextNode("  Eilutės: "));
    stats.appendChild(linesEl);
    header.appendChild(stats);

    canvas = document.createElement("canvas");
    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;
    canvas.className = "tetris-canvas";
    containerEl.appendChild(canvas);
    ctx = canvas.getContext("2d");

    const controls = document.createElement("div");
    controls.className = "tetris-controls";

    const leftBtn = createControlButton("⬅️", "left");
    const downBtn = createControlButton("⬇️", "down");
    const rotateBtn = createControlButton("🔄", "rotate");
    const rightBtn = createControlButton("➡️", "right");

    controls.appendChild(leftBtn);
    controls.appendChild(rotateBtn);
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

  function createControlButton(label, action) {
    const btn = document.createElement("button");
    btn.className = "tetris-btn";
    btn.textContent = label;
    btn.addEventListener("click", () => handleAction(action));
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      handleAction(action);
    });
    return btn;
  }

  function handleKeydown(e) {
    const keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "rotate",
      " ": "rotate"
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      handleAction(keyMap[e.key]);
    }
  }

  function handleAction(action) {
    if (!gameActive || !currentPiece) return;
    if (action === "left") movePiece(-1, 0);
    else if (action === "right") movePiece(1, 0);
    else if (action === "down") dropPiece();
    else if (action === "rotate") rotatePiece();
  }

  function start() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    score = 0;
    lines = 0;
    speed = INITIAL_SPEED;
    gameActive = true;
    scoreEl.textContent = "0";
    linesEl.textContent = "0";
    statusEl.textContent = "Naudok rodyklės arba mygtukus";
    statusEl.classList.remove("tetris-status--dead");
    spawnPiece();
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(tick, speed);
  }

  function spawnPiece() {
    const template = PIECES[Math.floor(Math.random() * PIECES.length)];
    currentPiece = {
      shape: template.shape.map(row => [...row]),
      color: template.color
    };
    pieceX = Math.floor((COLS - currentPiece.shape[0].length) / 2);
    pieceY = 0;
    if (collides(pieceX, pieceY, currentPiece.shape)) {
      gameOver();
    }
  }

  function collides(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (!shape[row][col]) continue;
        const nx = x + col;
        const ny = y + row;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
    }
    return false;
  }

  function movePiece(dx, dy) {
    if (!collides(pieceX + dx, pieceY + dy, currentPiece.shape)) {
      pieceX += dx;
      pieceY += dy;
      draw();
    }
  }

  function dropPiece() {
    if (!collides(pieceX, pieceY + 1, currentPiece.shape)) {
      pieceY++;
      draw();
    } else {
      lockPiece();
    }
  }

  function rotatePiece() {
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    if (!collides(pieceX, pieceY, rotated)) {
      currentPiece.shape = rotated;
      draw();
    }
  }

  function lockPiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (!currentPiece.shape[row][col]) continue;
        const ny = pieceY + row;
        const nx = pieceX + col;
        if (ny < 0) {
          gameOver();
          return;
        }
        board[ny][nx] = currentPiece.color;
      }
    }
    clearLines();
    spawnPiece();
    draw();
  }

  function clearLines() {
    let cleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row].every(cell => cell !== null)) {
        board.splice(row, 1);
        board.unshift(Array(COLS).fill(null));
        cleared++;
        row++;
      }
    }
    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800];
      score += points[cleared] || 800;
      lines += cleared;
      scoreEl.textContent = score;
      linesEl.textContent = lines;
      if (speed > MIN_SPEED) {
        speed = Math.max(MIN_SPEED, INITIAL_SPEED - lines * SPEED_INCREMENT);
        clearInterval(gameLoop);
        gameLoop = setInterval(tick, speed);
      }
    }
  }

  function tick() {
    if (!gameActive) return;
    if (!collides(pieceX, pieceY + 1, currentPiece.shape)) {
      pieceY++;
    } else {
      lockPiece();
    }
    draw();
  }

  function gameOver() {
    gameActive = false;
    clearInterval(gameLoop);
    statusEl.textContent = `💀 Baigi! Taškai: ${score}`;
    statusEl.classList.add("tetris-status--dead");
    draw();
  }

  function draw() {
    ctx.fillStyle = "#3A2E22";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#4A3E32";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col]) {
          drawCell(col, row, board[row][col]);
        }
      }
    }

    if (currentPiece) {
      for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
          if (currentPiece.shape[row][col]) {
            drawCell(pieceX + col, pieceY + row, currentPiece.color);
          }
        }
      }
    }
  }

  function drawCell(x, y, color) {
    const px = x * CELL_SIZE;
    const py = y * CELL_SIZE;
    ctx.fillStyle = color;
    ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(px + 1, py + 1, CELL_SIZE - 2, 3);
    ctx.fillRect(px + 1, py + 1, 3, CELL_SIZE - 2);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(px + 1, py + CELL_SIZE - 4, CELL_SIZE - 2, 3);
    ctx.fillRect(px + CELL_SIZE - 4, py + 1, 3, CELL_SIZE - 2);
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
