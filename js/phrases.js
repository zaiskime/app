// Phrase generation & Lithuanian grammatical agreement logic.
// A "phrase item" pairs a noun with an optional adjective and/or quantity,
// all correctly inflected for gender/number agreement, plus a visual descriptor.
// Difficulty (max quantity, which phrase patterns appear) is passed in per-call
// from the currently selected level, so this file has no hardcoded difficulty.

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function inflectNumber(n, gender) {
  return gender === "m" ? NUMBERS[n].m : NUMBERS[n].f;
}

function inflectAdjective(adj, gender, plural) {
  if (!plural) return gender === "m" ? adj.m_sg : adj.f_sg;
  return gender === "m" ? adj.m_pl : adj.f_pl;
}

function inflectNoun(noun, plural) {
  return plural ? noun.pl : noun.sg;
}

// Builds a grammatically-agreeing phrase: "[quantity] [adjective] [noun]"
function buildPhrase(noun, { adjective = null, quantity = null } = {}) {
  const plural = !!quantity && quantity !== 1;
  const parts = [];
  if (quantity) parts.push(inflectNumber(quantity, noun.gender));
  if (adjective) parts.push(inflectAdjective(adjective, noun.gender, plural));
  parts.push(inflectNoun(noun, plural));
  return parts.join(" ");
}

function makePhraseItem(noun, type, maxQuantity) {
  let adjective = null;
  let quantity = null;
  if (type === "adj_noun") {
    adjective = pickRandom(ADJECTIVES);
  } else if (type === "num_noun") {
    quantity = randomInt(1, maxQuantity);
  } else {
    adjective = pickRandom(ADJECTIVES);
    quantity = randomInt(1, maxQuantity);
  }
  const text = buildPhrase(noun, { adjective, quantity });
  const id = [noun.id, type, adjective ? adjective.id : "x", quantity || "x"].join("_");
  return { id, noun, adjective, quantity, text };
}

// Generates a round's worth of unique phrase items, mixing the phrase types
// allowed at this difficulty level.
function generateRoundItems(category, count, phraseTypes, maxQuantity) {
  const items = [];
  const usedIds = new Set();
  let guard = 0;
  while (items.length < count && guard < count * 30) {
    guard++;
    const noun = pickRandom(category.nouns);
    const type = pickRandom(phraseTypes);
    const item = makePhraseItem(noun, type, maxQuantity);
    if (!usedIds.has(item.id)) {
      usedIds.add(item.id);
      items.push(item);
    }
  }
  return items;
}

// Generates a wrong-answer phrase by varying exactly one dimension (noun, adjective, or quantity)
// away from the correct item, so distractors are plausible but clearly distinct.
function generateDistractor(correctItem, category, excludeTexts, maxQuantity) {
  const dims = ["noun"];
  if (correctItem.adjective) dims.push("adjective");
  if (correctItem.quantity) dims.push("quantity");

  let attempt = 0;
  while (attempt < 15) {
    attempt++;
    const dim = pickRandom(dims);
    let noun = correctItem.noun;
    let adjective = correctItem.adjective;
    let quantity = correctItem.quantity;

    if (dim === "noun") {
      const others = category.nouns.filter(n => n.id !== noun.id);
      noun = pickRandom(others);
    } else if (dim === "adjective") {
      const others = ADJECTIVES.filter(a => a.id !== adjective.id);
      adjective = pickRandom(others);
    } else if (dim === "quantity") {
      let q;
      do { q = randomInt(1, maxQuantity); } while (q === quantity);
      quantity = q;
    }

    const text = buildPhrase(noun, { adjective, quantity });
    if (!excludeTexts.has(text)) {
      return { id: `${noun.id}_d_${Math.random()}`, noun, adjective, quantity, text };
    }
  }
  return null;
}

function generateDistractors(correctItem, category, n, maxQuantity) {
  const excludeTexts = new Set([correctItem.text]);
  const result = [];
  let guard = 0;
  while (result.length < n && guard < n * 20) {
    guard++;
    const d = generateDistractor(correctItem, category, excludeTexts, maxQuantity);
    if (d) {
      excludeTexts.add(d.text);
      result.push(d);
    }
  }
  return result;
}

// Renders a phrase item as a visual tile: repeated emoji for quantity,
// a color-tinted border/background for color adjectives, and scaling for size adjectives.
function renderVisualTile(item) {
  const tile = document.createElement("div");
  tile.className = "phrase-visual";

  if (item.adjective && item.adjective.type === "color") {
    tile.style.setProperty("--tile-tint", item.adjective.hex);
    tile.classList.add("phrase-visual--tinted");
  }

  const qty = item.quantity || 1;
  const scale = (item.adjective && item.adjective.type === "size") ? item.adjective.scale : 1;
  const baseSize = qty > 1 ? 1.6 : 2.5;

  for (let i = 0; i < qty; i++) {
    const span = document.createElement("span");
    span.className = "phrase-visual__emoji";
    span.style.fontSize = (baseSize * scale) + "rem";
    span.textContent = item.noun.emoji;
    tile.appendChild(span);
  }
  return tile;
}
