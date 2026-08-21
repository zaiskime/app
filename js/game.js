// Core game controller: screen routing, progress persistence, round orchestration.

const STORAGE_KEY = "ltGameProgress_v2";
const SOUND_KEY = "ltGameSound_v1";
const ROUND_LENGTH = 6;

const Game = {
  state: {
    currentCategory: null,
    currentMechanic: null
  },
  soundEnabled: true,

  loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { categories: {} };
    } catch (e) {
      console.warn("Nepavyko įkelti išsaugotos pažangos.", e);
      return { categories: {} };
    }
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn("Nepavyko išsaugoti pažangos.", e);
    }
  },

  recordResult(categoryId, correct, total) {
    const progress = this.loadProgress();
    if (!progress.categories[categoryId]) {
      progress.categories[categoryId] = { bestScore: 0, plays: 0, stars: 0 };
    }
    const entry = progress.categories[categoryId];
    entry.plays += 1;
    entry.bestScore = Math.max(entry.bestScore, correct);
    let stars = 1;
    if (correct === total) stars = 3;
    else if (correct / total >= 0.5) stars = 2;
    entry.stars = Math.max(entry.stars, stars);
    this.saveProgress(progress);
    return entry;
  },

  // ---------- Sound (Web Speech API) ----------
  loadSoundPref() {
    try {
      const v = localStorage.getItem(SOUND_KEY);
      return v === null ? true : v === "on";
    } catch (e) {
      return true;
    }
  },

  saveSoundPref(enabled) {
    try {
      localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
    } catch (e) {}
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.saveSoundPref(this.soundEnabled);
    this.updateSoundButton();
    if (!this.soundEnabled) LTSpeech.stop();
  },

  updateSoundButton() {
    const btn = document.getElementById("btn-sound-toggle");
    if (!btn) return;
    btn.textContent = this.soundEnabled ? "🔊" : "🔇";
    btn.setAttribute("aria-pressed", String(!this.soundEnabled));
  },

  // Speaks a phrase item's Lithuanian text aloud, if sound is on and supported.
  playSound(item) {
    if (!item || !item.text) return;
    if (this.soundEnabled && LTSpeech.isSupported) {
      LTSpeech.speak(item.text);
    }
  },

  showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("screen--active"));
    document.getElementById(id).classList.add("screen--active");
  },

  goHome() {
    this.showScreen("screen-home");
  },

  goToCategories() {
    this.renderCategories();
    this.showScreen("screen-categories");
  },

  renderCategories() {
    const grid = document.getElementById("category-grid");
    const progress = this.loadProgress();
    grid.innerHTML = "";
    CATEGORIES.forEach(cat => {
      const entry = progress.categories[cat.id] || { stars: 0 };
      const card = document.createElement("button");
      card.className = "category-card";
      card.style.setProperty("--card-accent", cat.color);
      card.innerHTML = `
        <span class="category-card__icon">${cat.icon}</span>
        <span class="category-card__name">${cat.nameLt}</span>
        <span class="category-card__stars">${"⭐".repeat(entry.stars)}${"☆".repeat(3 - entry.stars)}</span>
      `;
      card.addEventListener("click", () => this.startRound(cat.id));
      grid.appendChild(card);
    });
  },

  startRound(categoryId) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    this.state.currentCategory = category;

    const mechanics = ["matching", "quiz", "dragdrop"];
    const mechanicKey = mechanics[Math.floor(Math.random() * mechanics.length)];
    this.state.currentMechanic = mechanicKey;

    const items = generateRoundItems(category, ROUND_LENGTH);

    const container = document.getElementById("game-area");
    container.innerHTML = "";
    document.getElementById("game-category-label").textContent = `${category.icon} ${category.nameLt}`;

    Mechanics[mechanicKey].start(container, items, category, (correct, total) => {
      this.finishRound(correct, total);
    });

    this.showScreen("screen-game");
  },

  finishRound(correct, total) {
    const category = this.state.currentCategory;
    const entry = this.recordResult(category.id, correct, total);

    const resultsEl = document.getElementById("results-content");
    const pct = Math.round((correct / total) * 100);
    let message = "Puiku!";
    if (pct < 50) message = "Gerai pradėta!";
    else if (pct < 100) message = "Šauniai!";

    resultsEl.innerHTML = `
      <p class="results__stars">${"⭐".repeat(entry.stars)}${"☆".repeat(3 - entry.stars)}</p>
      <p class="results__message">${message}</p>
      <p class="results__score">${correct} / ${total} teisingai</p>
    `;
    this.showScreen("screen-results");
  },

  playAgain() {
    this.startRound(this.state.currentCategory.id);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-start").addEventListener("click", () => Game.goToCategories());
  document.getElementById("btn-back-home").addEventListener("click", () => Game.goHome());
  document.getElementById("btn-play-again").addEventListener("click", () => Game.playAgain());
  document.getElementById("btn-choose-another").addEventListener("click", () => Game.goToCategories());

  const soundBtn = document.getElementById("btn-sound-toggle");
  if (LTSpeech.isSupported) {
    Game.soundEnabled = Game.loadSoundPref();
    Game.updateSoundButton();
    soundBtn.addEventListener("click", () => Game.toggleSound());
  } else {
    // No Web Speech API support (or no voices) — hide the control entirely
    // rather than offering a toggle that does nothing.
    soundBtn.style.display = "none";
  }

  Game.goHome();
});
