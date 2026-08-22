// Matching mechanic: tap a picture tile, then tap the Lithuanian phrase that matches it.

const MatchingMechanic = {
  start(container, items, category, level, onComplete) {
    let selectedItem = null;
    let matchedCount = 0;
    let correctCount = 0;
    const total = items.length;

    const visualOrder = [...items].sort(() => Math.random() - 0.5);
    const wordOrder = [...items].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <p class="game-instructions">Paspausk paveikslėlį, tada frazę, kuri jį atitinka!</p>
      <div class="matching-board">
        <div class="matching-col" id="matching-visuals"></div>
        <div class="matching-col" id="matching-words"></div>
      </div>
    `;

    const visualCol = container.querySelector("#matching-visuals");
    const wordCol = container.querySelector("#matching-words");

    visualOrder.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "match-tile";
      btn.dataset.id = item.id;
      btn.appendChild(renderVisualTile(item));
      btn.addEventListener("click", () => {
        if (btn.classList.contains("match-tile--done")) return;
        container.querySelectorAll("#matching-visuals .match-tile").forEach(b => b.classList.remove("match-tile--selected"));
        btn.classList.add("match-tile--selected");
        selectedItem = item;
      });
      visualCol.appendChild(btn);
    });

    wordOrder.forEach(item => {
      const btn = document.createElement("button");
      btn.className = "match-tile match-tile--word";
      btn.dataset.id = item.id;
      btn.textContent = item.text;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("match-tile--done") || !selectedItem) return;
        const visualBtn = visualCol.querySelector(`[data-id="${selectedItem.id}"]`);
        if (selectedItem.id === item.id) {
          btn.classList.add("match-tile--done", "match-tile--correct");
          visualBtn.classList.add("match-tile--done", "match-tile--correct");
          correctCount++;
          Game.playSound(item);
        } else {
          btn.classList.add("match-tile--wrong");
          visualBtn.classList.add("match-tile--wrong");
          setTimeout(() => {
            btn.classList.remove("match-tile--wrong");
            visualBtn.classList.remove("match-tile--wrong");
          }, 500);
        }
        visualBtn.classList.remove("match-tile--selected");
        selectedItem = null;
        matchedCount++;
        if (matchedCount === total) {
          setTimeout(() => onComplete(correctCount, total), 600);
        }
      });
      wordCol.appendChild(btn);
    });
  }
};
