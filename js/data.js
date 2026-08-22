// Vocabulary data: nouns (with gender + plural), adjectives (full agreement forms),
// numbers 1-9 (with gender forms), and difficulty levels mapped to the Lithuanian
// primary-school "klasė" system.

// index 0 unused, so NUMBERS[3] === the word for "3"
const NUMBERS = [
  null,
  { m: "vienas", f: "viena" },
  { m: "du", f: "dvi" },
  { m: "trys", f: "trys" },
  { m: "keturi", f: "keturios" },
  { m: "penki", f: "penkios" },
  { m: "šeši", f: "šešios" },
  { m: "septyni", f: "septynios" },
  { m: "aštuoni", f: "aštuonios" },
  { m: "devyni", f: "devynios" }
];

const ADJECTIVES = [
  { id: "red", type: "color", hex: "#D14B3F", m_sg: "raudonas", f_sg: "raudona", m_pl: "raudoni", f_pl: "raudonos" },
  { id: "blue", type: "color", hex: "#4FA3C4", m_sg: "mėlynas", f_sg: "mėlyna", m_pl: "mėlyni", f_pl: "mėlynos" },
  { id: "green", type: "color", hex: "#4C8C5B", m_sg: "žalias", f_sg: "žalia", m_pl: "žali", f_pl: "žalios" },
  { id: "yellow", type: "color", hex: "#F2A93B", m_sg: "geltonas", f_sg: "geltona", m_pl: "geltoni", f_pl: "geltonos" },
  { id: "white", type: "color", hex: "#EDE6D6", m_sg: "baltas", f_sg: "balta", m_pl: "balti", f_pl: "baltos" },
  { id: "black", type: "color", hex: "#3A2E22", m_sg: "juodas", f_sg: "juoda", m_pl: "juodi", f_pl: "juodos" },
  { id: "big", type: "size", scale: 1.5, m_sg: "didelis", f_sg: "didelė", m_pl: "dideli", f_pl: "didelės" },
  { id: "small", type: "size", scale: 0.65, m_sg: "mažas", f_sg: "maža", m_pl: "maži", f_pl: "mažos" }
];

const CATEGORIES = [
  {
    id: "animals",
    nameLt: "Gyvūnai",
    icon: "🦌",
    color: "var(--c-forest)",
    nouns: [
      { id: "suo", sg: "šuo", pl: "šunys", gender: "m", emoji: "🐶" },
      { id: "kate", sg: "katė", pl: "katės", gender: "f", emoji: "🐱" },
      { id: "arklys", sg: "arklys", pl: "arkliai", gender: "m", emoji: "🐴" },
      { id: "karve", sg: "karvė", pl: "karvės", gender: "f", emoji: "🐮" },
      { id: "paukstis", sg: "paukštis", pl: "paukščiai", gender: "m", emoji: "🐦" },
      { id: "zuvis", sg: "žuvis", pl: "žuvys", gender: "f", emoji: "🐟" },
      { id: "kiaule", sg: "kiaulė", pl: "kiaulės", gender: "f", emoji: "🐷" },
      { id: "truisis", sg: "triušis", pl: "triušiai", gender: "m", emoji: "🐰" }
    ]
  },
  {
    id: "fruits",
    nameLt: "Vaisiai",
    icon: "🍎",
    color: "var(--c-cherry)",
    nouns: [
      { id: "obuolys", sg: "obuolys", pl: "obuoliai", gender: "m", emoji: "🍎" },
      { id: "bananas", sg: "bananas", pl: "bananai", gender: "m", emoji: "🍌" },
      { id: "kriause", sg: "kriaušė", pl: "kriaušės", gender: "f", emoji: "🍐" },
      { id: "apelsinas", sg: "apelsinas", pl: "apelsinai", gender: "m", emoji: "🍊" },
      { id: "braske", sg: "braškė", pl: "braškės", gender: "f", emoji: "🍓" },
      { id: "vynuoge", sg: "vynuogė", pl: "vynuogės", gender: "f", emoji: "🍇" },
      { id: "citrina", sg: "citrina", pl: "citrinos", gender: "f", emoji: "🍋" },
      { id: "vysnia", sg: "vyšnia", pl: "vyšnios", gender: "f", emoji: "🍒" }
    ]
  },
  {
    id: "vegetables",
    nameLt: "Daržovės",
    icon: "🥕",
    color: "var(--c-sun)",
    nouns: [
      { id: "morka", sg: "morka", pl: "morkos", gender: "f", emoji: "🥕" },
      { id: "agurkas", sg: "agurkas", pl: "agurkai", gender: "m", emoji: "🥒" },
      { id: "pomidoras", sg: "pomidoras", pl: "pomidorai", gender: "m", emoji: "🍅" },
      { id: "bulve", sg: "bulvė", pl: "bulvės", gender: "f", emoji: "🥔" },
      { id: "kopustas", sg: "kopūstas", pl: "kopūstai", gender: "m", emoji: "🥬" },
      { id: "svogunas", sg: "svogūnas", pl: "svogūnai", gender: "m", emoji: "🧅" },
      { id: "paprika", sg: "paprika", pl: "paprikos", gender: "f", emoji: "🫑" },
      { id: "cesnakas", sg: "česnakas", pl: "česnakai", gender: "m", emoji: "🧄" }
    ]
  },
  {
    id: "objects",
    nameLt: "Daiktai",
    icon: "🧸",
    color: "var(--c-sky)",
    nouns: [
      { id: "kamuolys", sg: "kamuolys", pl: "kamuoliai", gender: "m", emoji: "⚽" },
      { id: "knyga", sg: "knyga", pl: "knygos", gender: "f", emoji: "📖" },
      { id: "kede", sg: "kėdė", pl: "kėdės", gender: "f", emoji: "🪑" },
      { id: "langas", sg: "langas", pl: "langai", gender: "m", emoji: "🪟" },
      { id: "lova", sg: "lova", pl: "lovos", gender: "f", emoji: "🛏️" },
      { id: "laikrodis", sg: "laikrodis", pl: "laikrodžiai", gender: "m", emoji: "🕐" },
      { id: "raktas", sg: "raktas", pl: "raktai", gender: "m", emoji: "🔑" },
      { id: "lempa", sg: "lempa", pl: "lempos", gender: "f", emoji: "💡" }
    ]
  }
];

// Difficulty levels mapped to the Lithuanian primary-school class system.
// maxQuantity caps how high numbers go; phraseTypes controls which grammatical
// patterns appear (younger levels skip the hardest triple combo).
const LEVELS = [
  { id: 1, nameLt: "1 klasė", roundLength: 5, maxQuantity: 5, phraseTypes: ["adj_noun", "num_noun"] },
  { id: 2, nameLt: "2 klasė", roundLength: 6, maxQuantity: 7, phraseTypes: ["adj_noun", "num_noun", "num_adj_noun"] },
  { id: 3, nameLt: "3 klasė", roundLength: 8, maxQuantity: 9, phraseTypes: ["adj_noun", "num_noun", "num_adj_noun"] }
];
