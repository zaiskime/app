// Quiz mechanic: show a visual tile, pick the correctly-inflected phrase from 4 options.

const QuizMechanic = {
  start(container, items, category, level, onComplete) {
    let index = 0;
    let correctCount = 0;
    const total = items.length;

    const renderQuestion = () => {
      const current = items[index];
      const distractors = generateDistractors(current, category, 3, level.maxQuantity);
      const options = [current, ...distractors].sort(() => Math.random() - 0.5);

      container.innerHTML = `
        <p class="game-instructions">Kuri frazė tinka?</p>
        <p class="quiz-progress">${index + 1} / ${total}</p>
        <div class="quiz-visual" id="quiz-visual"></div>
        <div class="quiz-options" id="quiz-options"></div>
      `;

      container.querySelector("#quiz-visual").appendChild(renderVisualTile(current));

      const optionsEl = container.querySelector("#quiz-options");
      options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt.text;
        btn.addEventListener("click", () => {
          container.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
          if (opt.text === current.text) {
            btn.classList.add("quiz-option--correct");
            correctCount++;
          } else {
            btn.classList.add("quiz-option--wrong");
            const correctBtn = [...optionsEl.children].find(b => b.textContent === current.text);
            if (correctBtn) correctBtn.classList.add("quiz-option--correct");
          }
          // Speak the correct phrase as feedback either way — reinforces pronunciation.
          Game.playSound(current);
          setTimeout(() => {
            index++;
            if (index < total) {
              renderQuestion();
            } else {
              onComplete(correctCount, total);
            }
          }, 700);
        });
        optionsEl.appendChild(btn);
      });
    };

    renderQuestion();
  }
};
