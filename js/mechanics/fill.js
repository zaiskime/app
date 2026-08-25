// Fill mechanic: show a sentence with a missing word, type the answer.

const FillMechanic = {
  start(container, items, category, level, onComplete) {
    let index = 0;
    let correctCount = 0;
    const total = items.length;

    const renderQuestion = () => {
      const current = items[index];
      const words = current.text.split(" ");
      const blankIndex = words.length - 1;
      const missingWord = words[blankIndex];
      words[blankIndex] = "____";
      const sentence = words.join(" ");
      const displaySentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

      container.innerHTML = `
        <p class="game-instructions">Užpildyk tuščiąją vietą!</p>
        <p class="quiz-progress">${index + 1} / ${total}</p>
        <div class="fill-visual" id="fill-visual" style="margin-bottom:20px;display:flex;justify-content:center;"></div>
        <p class="fill-sentence">${displaySentence}</p>
        <div class="fill-input-wrapper">
          <div id="fill-input" class="fill-input" contenteditable="true" role="textbox" autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false"></div>
        </div>
        <button id="fill-submit" class="btn btn--primary" style="margin-top:12px;" aria-label="Patikrinti">✓</button>
      `;

      container.querySelector("#fill-visual").appendChild(renderVisualTile(current));

      const input = container.querySelector("#fill-input");
      const missing = missingWord;

      const colorize = () => {
        const text = input.textContent || "";
        let html = "";
        for (let i = 0; i < text.length; i++) {
          const isMatch = text[i].toLowerCase() === missing[i].toLowerCase();
          html += `<span class="fill-char${isMatch ? " fill-char--correct" : " fill-char--wrong"}">${text[i]}</span>`;
        }
        input.innerHTML = html;
        placeCaretAtEnd(input);
      };

      const placeCaretAtEnd = (el) => {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      };

      const checkAnswer = () => {
        const answer = (input.textContent || "").trim();
        if (answer.toLowerCase() === missing.toLowerCase()) {
          correctCount++;
          Game.playSound(current);
          input.classList.add("fill-input--correct");
          FX.celebrate(input);
          setTimeout(() => {
            index++;
            if (index < total) renderQuestion();
            else onComplete(correctCount, total);
          }, 800);
        } else {
          input.classList.add("fill-input--wrong");
          setTimeout(() => input.classList.remove("fill-input--wrong"), 400);
        }
      };

      input.addEventListener("input", colorize);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          checkAnswer();
        }
      });
      input.focus();
    };

    renderQuestion();
  }
};
