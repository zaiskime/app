// Drag-and-drop mechanic: drag phrase chips onto the matching picture tile.
// Uses Pointer Events (not native HTML5 DnD) so it works well on touch devices.

const DragDropMechanic = {
  start(container, items, category, level, onComplete) {
    let placedCount = 0;
    let correctCount = 0;
    const total = items.length;

    const targets = [...items].sort(() => Math.random() - 0.5);
    const chips = [...items].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <p class="game-instructions">Nutempk frazę prie tinkamo paveikslėlio!</p>
      <div class="dragdrop-targets" id="dragdrop-targets"></div>
      <div class="dragdrop-chips" id="dragdrop-chips"></div>
    `;

    const targetsEl = container.querySelector("#dragdrop-targets");
    const chipsEl = container.querySelector("#dragdrop-chips");

    targets.forEach(item => {
      const zone = document.createElement("div");
      zone.className = "drop-zone";
      zone.dataset.id = item.id;
      zone.appendChild(renderVisualTile(item));
      targetsEl.appendChild(zone);
    });

    chips.forEach(item => {
      const chip = document.createElement("div");
      chip.className = "drag-chip";
      chip.dataset.id = item.id;
      chip.textContent = item.text;
      chip.style.touchAction = "none";
      chipsEl.appendChild(chip);
      makeDraggable(chip, item);
    });

    function makeDraggable(chip, item) {
      let offsetX = 0, offsetY = 0, dragging = false;

      chip.addEventListener("pointerdown", e => {
        if (chip.classList.contains("drag-chip--done")) return;
        dragging = true;
        chip.setPointerCapture(e.pointerId);
        chip.classList.add("drag-chip--active");
        const rect = chip.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        chip.style.position = "fixed";
        chip.style.zIndex = 1000;
        chip.style.width = rect.width + "px";
      });

      chip.addEventListener("pointermove", e => {
        if (!dragging) return;
        chip.style.left = (e.clientX - offsetX) + "px";
        chip.style.top = (e.clientY - offsetY) + "px";
      });

      chip.addEventListener("pointerup", e => {
        if (!dragging) return;
        dragging = false;
        chip.classList.remove("drag-chip--active");

        const zone = findZoneUnder(e.clientX, e.clientY);
        if (zone && !zone.classList.contains("drop-zone--done")) {
          const isCorrect = zone.dataset.id === chip.dataset.id;
          if (isCorrect) {
            correctCount++;
            zone.classList.add("drop-zone--done", "drop-zone--correct");
            chip.classList.add("drag-chip--done");
            chip.style.visibility = "hidden";
            Game.playSound(item);
            FX.celebrate(zone);
          } else {
            zone.classList.add("drop-zone--wrong");
            setTimeout(() => zone.classList.remove("drop-zone--wrong"), 400);
            resetChipPosition(chip);
          }
          placedCount++;
          if (placedCount === total) {
            setTimeout(() => onComplete(correctCount, total), 600);
          }
        } else {
          resetChipPosition(chip);
        }
      });

      function resetChipPosition(chip) {
        chip.style.position = "";
        chip.style.left = "";
        chip.style.top = "";
        chip.style.zIndex = "";
        chip.style.width = "";
      }
    }

    function findZoneUnder(x, y) {
      const zones = targetsEl.querySelectorAll(".drop-zone");
      for (const zone of zones) {
        const rect = zone.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return zone;
        }
      }
      return null;
    }
  }
};
