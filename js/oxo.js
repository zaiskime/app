// OXO (tic-tac-toe) reward mini game — launched after a successful round.
// Player vs simple AI. Appears on the results screen as a bonus activity.

const OXOGame = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = false;
  let containerEl = null;
  let statusEl = null;
  let cells = [];
  let roundCount = 0;
  const MAX_ROUNDS = 5;

  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWinner() {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(cell => cell !== "")) return "draw";
    return null;
  }

  function aiMove() {
    const empty = board.map((v, i) => v === "" ? i : -1).filter(i => i >= 0);
    if (empty.length === 0) return -1;

    for (const line of WIN_LINES) {
      const vals = line.map(i => board[i]);
      const oCount = vals.filter(v => v === "O").length;
      const emptyInLine = vals.filter(v => v === "").length;
      if (oCount === 2 && emptyInLine === 1) {
        return line[vals.indexOf("")];
      }
    }

    for (const line of WIN_LINES) {
      const vals = line.map(i => board[i]);
      const xCount = vals.filter(v => v === "X").length;
      const emptyInLine = vals.filter(v => v === "").length;
      if (xCount === 2 && emptyInLine === 1) {
        return line[vals.indexOf("")];
      }
    }

    if (board[4] === "") return 4;

    const corners = [0, 2, 6, 8].filter(i => board[i] === "");
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    return empty[Math.floor(Math.random() * empty.length)];
  }

  function handleCellClick(index) {
    if (!gameActive || board[index] !== "" || currentPlayer !== "X") return;

    board[index] = "X";
    cells[index].textContent = "X";
    cells[index].classList.add("oxo-cell--x");

    const winner = checkWinner();
    if (winner) {
      endGame(winner);
      return;
    }

    currentPlayer = "O";
    statusEl.textContent = "Saulutės eilė...";

    setTimeout(() => {
      const ai = aiMove();
      if (ai >= 0) {
        board[ai] = "O";
        cells[ai].textContent = "O";
        cells[ai].classList.add("oxo-cell--o");
      }

      const winner2 = checkWinner();
      if (winner2) {
        endGame(winner2);
        return;
      }

      currentPlayer = "X";
      statusEl.textContent = "Tavo eilė!";
    }, 400);
  }

  function endGame(winner) {
    gameActive = false;
    roundCount++;
    if (winner === "X" || winner === "draw") {
      statusEl.textContent = winner === "draw" ? "🤝 Lygiosios — laimėjai!" : "🎉 Tu laimėjai!";
      statusEl.classList.add("oxo-status--win");
    } else {
      statusEl.textContent = "Saulutė laimėjo. Bandyk dar kartą!";
      statusEl.classList.add("oxo-status--lose");
    }
    if (roundCount >= MAX_ROUNDS) {
      setTimeout(() => {
        gameActive = false;
        statusEl.textContent = `🏁 Atlikta ${MAX_ROUNDS} raundų!`;
        statusEl.classList.add("oxo-status--done");
        cells.forEach(c => c.disabled = true);
        const btn = containerEl.querySelector(".btn--small");
        if (btn) btn.disabled = true;
      }, 1000);
    }
  }

  function reset() {
    if (roundCount >= MAX_ROUNDS) return;
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusEl.textContent = `Tavo eilė! (${roundCount + 1}/${MAX_ROUNDS})`;
    statusEl.classList.remove("oxo-status--win", "oxo-status--lose");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.disabled = false;
      cell.classList.remove("oxo-cell--x", "oxo-cell--o");
    });
  }

  function render(parent) {
    containerEl = document.createElement("div");
    containerEl.className = "oxo-game";

    const title = document.createElement("p");
    title.className = "oxo-title";
    title.textContent = "🎮 OXO — laimėjimo prizas!";
    containerEl.appendChild(title);

    statusEl = document.createElement("p");
    statusEl.className = "oxo-status";
    statusEl.textContent = "Tavo eilė!";
    containerEl.appendChild(statusEl);

    const grid = document.createElement("div");
    grid.className = "oxo-grid";

    cells = [];
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("button");
      cell.className = "oxo-cell";
      cell.addEventListener("click", () => handleCellClick(i));
      cells.push(cell);
      grid.appendChild(cell);
    }
    containerEl.appendChild(grid);

    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn--secondary btn--small";
    resetBtn.textContent = "Žaisti iš naujo";
    resetBtn.style.marginTop = "12px";
    resetBtn.addEventListener("click", reset);
    containerEl.appendChild(resetBtn);

    gameActive = true;
    parent.appendChild(containerEl);
  }

  return { render };
})();
