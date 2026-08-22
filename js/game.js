// Core game controller: screen routing, progress persistence, level selection,
// round orchestration.

const STORAGE_KEY = "ltGameProgress_v2";
const SOUND_KEY = "ltGameSound_v1";
const LEVEL_KEY = "ltGameLevel_v1";

const Game = {
  state: {
    currentCategory: null,
    currentMechanic: null,
    level: LEVELS[0]
  },
  soundEnabled: true,

  // ---------- Progress persistence ----------
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

  // ---------- Level (difficulty) persistence ----------
  loadLevel() {
    try {
      const id = parseInt(localStorage.getItem(LEVEL_KEY), 10);
      return LEVELS.find(l => l.id === id) || LEVELS[0];
    } catch (e) {
      return LEVELS[0];
    }
  },

  saveLevel(id) {
    try {
      localStorage.setItem(LEVEL_KEY, String(id));
    } catch (e) {}
  },

  selectLevel(id) {
    const level = LEVELS.find(l => l.id === id) || LEVELS[0];
    this.state.level = level;
    this.saveLevel(id);
    this.goToCategories();
  },

  updateHomeLevelLabel() {
    const el = document.getElementById("home-level-label");
    if (el) el.textContent = this.state.level.nameLt;
  },

  renderLevelScreen() {
    document.querySelectorAll("#level-grid .level-card").forEach(btn => {
      const isSelected = parseInt(btn.dataset.level, 10) === this.state.level.id;
      btn.classList.toggle("level-card--selected", isSelected);
    });
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

  // ---------- Screen routing ----------
  showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("screen--active"));
    document.getElementById(id).classList.add("screen--active");
  },

  goHome() {
    LTSpeech.stop();
    this.updateHomeLevelLabel();
    this.showScreen("screen-home");
  },

  goToLevelSelect() {
    this.renderLevelScreen();
    this.showScreen("screen-level");
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

  // ---------- Round orchestration ----------
  startRound(categoryId) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    this.state.currentCategory = category;
    const level = this.state.level;

    const mechanics = ["matching", "quiz", "dragdrop"];
    const mechanicKey = mechanics[Math.floor(Math.random() * mechanics.length)];
    this.state.currentMechanic = mechanicKey;

    const items = generateRoundItems(category, level.roundLength, level.phraseTypes, level.maxQuantity);

    const container = document.getElementById("game-area");
    container.innerHTML = "";
    document.getElementById("game-category-label").textContent = `${category.icon} ${category.nameLt}`;

    Mechanics[mechanicKey].start(container, items, category, level, (correct, total) => {
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
  Game.state.level = Game.loadLevel();

  document.getElementById("btn-start").addEventListener("click", () => Game.goToCategories());
  document.getElementById("btn-open-level").addEventListener("click", () => Game.goToLevelSelect());
  document.getElementById("btn-level-back").addEventListener("click", () => Game.goHome());
  document.querySelectorAll("#level-grid .level-card").forEach(btn => {
    btn.addEventListener("click", () => Game.selectLevel(parseInt(btn.dataset.level, 10)));
  });

  document.getElementById("btn-back-home").addEventListener("click", () => Game.goHome());
  document.getElementById("btn-home-from-game").addEventListener("click", () => Game.goHome());
  document.getElementById("btn-home-from-results").addEventListener("click", () => Game.goHome());

  document.getElementById("btn-play-again").addEventListener("click", () => Game.playAgain());
  document.getElementById("btn-choose-another").addEventListener("click", () => Game.goToCategories());

  const soundBtn = document.getElementById("btn-sound-toggle");
  if (LTSpeech.isSupported) {
    Game.soundEnabled = Game.loadSoundPref();
    Game.updateSoundButton();
    soundBtn.addEventListener("click", () => Game.toggleSound());
  } else {
    soundBtn.style.display = "none";
  }

  Game.goHome();
});
