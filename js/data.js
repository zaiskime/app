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
  },
  {
    id: "body",
    nameLt: "Kūno dalys",
    icon: "🧍",
    color: "#E88CA5",
    nouns: [
      { id: "galva", sg: "galva", pl: "galvos", gender: "f", emoji: "👤" },
      { id: "ranka", sg: "ranka", pl: "rankos", gender: "f", emoji: "✋" },
      { id: "koja", sg: "koja", pl: "kojos", gender: "f", emoji: "🦵" },
      { id: "akis", sg: "akis", pl: "akys", gender: "f", emoji: "👁️" },
      { id: "ausis", sg: "ausis", pl: "ausys", gender: "f", emoji: "👂" },
      { id: "nosis", sg: "nosis", pl: "nosys", gender: "f", emoji: "👃" },
      { id: "liezuvis", sg: "liežuvis", pl: "liežuviai", gender: "m", emoji: "👅" },
      { id: "dantis", sg: "dantis", pl: "dantys", gender: "m", emoji: "🦷" }
    ]
  },
  {
    id: "clothes",
    nameLt: "Drabužiai",
    icon: "👕",
    color: "#8B6BB5",
    nouns: [
      { id: "kepure", sg: "kepurė", pl: "kepurės", gender: "f", emoji: "🧢" },
      { id: "sijonas", sg: "sijonas", pl: "sijonai", gender: "m", emoji: "👗" },
      { id: "striuke", sg: "striukė", pl: "striukės", gender: "f", emoji: "🧥" },
      { id: "salikas", sg: "šalikas", pl: "šalikai", gender: "m", emoji: "🧣" },
      { id: "batas", sg: "batas", pl: "batai", gender: "m", emoji: "👟" },
      { id: "pirstine", sg: "pirštinė", pl: "pirštinės", gender: "f", emoji: "🧤" },
      { id: "kostiumas", sg: "kostiumas", pl: "kostiumai", gender: "m", emoji: "👔" },
      { id: "kojine", sg: "kojinė", pl: "kojinės", gender: "f", emoji: "🧦" }
    ]
  },
  {
    id: "transport",
    nameLt: "Transportas",
    icon: "🚗",
    color: "#5B9EA6",
    nouns: [
      { id: "masina", sg: "mašina", pl: "mašinos", gender: "f", emoji: "🚗" },
      { id: "autobusas", sg: "autobusas", pl: "autobusai", gender: "m", emoji: "🚌" },
      { id: "lektuvas", sg: "lėktuvas", pl: "lėktuvai", gender: "m", emoji: "✈️" },
      { id: "dviratis", sg: "dviratis", pl: "dviračiai", gender: "m", emoji: "🚲" },
      { id: "traukinys", sg: "traukinys", pl: "traukiniai", gender: "m", emoji: "🚂" },
      { id: "laivas", sg: "laivas", pl: "laivai", gender: "m", emoji: "🚢" },
      { id: "sraigtasparnis", sg: "sraigtasparnis", pl: "sraigtasparniai", gender: "m", emoji: "🚁" },
      { id: "vagonas", sg: "vagonas", pl: "vagonai", gender: "m", emoji: "🚃" }
    ]
  },
  {
    id: "nature",
    nameLt: "Gamtos daiktai",
    icon: "🌳",
    color: "#7AAB5C",
    nouns: [
      { id: "medis", sg: "medis", pl: "medžiai", gender: "m", emoji: "🌳" },
      { id: "gele", sg: "gėlė", pl: "gėlės", gender: "f", emoji: "🌸" },
      { id: "saule", sg: "saulė", pl: "saulės", gender: "f", emoji: "☀️" },
      { id: "debesys", sg: "debesys", pl: "debesys", gender: "m", emoji: "☁️" },
      { id: "uola", sg: "uola", pl: "uolos", gender: "f", emoji: "🪨" },
      { id: "upe", sg: "upė", pl: "upės", gender: "f", emoji: "🌊" },
      { id: "kalnas", sg: "kalnas", pl: "kalnai", gender: "m", emoji: "⛰️" },
      { id: "miskas", sg: "miškas", pl: "miškai", gender: "m", emoji: "🌲" }
    ]
  },
  {
    id: "food",
    nameLt: "Maistas",
    icon: "🍎",
    color: "#D4915E",
    nouns: [
      { id: "duona", sg: "duona", pl: "duonos", gender: "f", emoji: "🍞" },
      { id: "suris", sg: "sūris", pl: "sūriai", gender: "m", emoji: "🧀" },
      { id: "pienas", sg: "pienas", pl: "pienai", gender: "m", emoji: "🥛" },
      { id: "sriuba", sg: "sriuba", pl: "sriubos", gender: "f", emoji: "🍲" },
      { id: "mesa", sg: "mėsa", pl: "mėsos", gender: "f", emoji: "🥩" },
      { id: "kiausinis", sg: "kiaušinis", pl: "kiaušiniai", gender: "m", emoji: "🥚" },
      { id: "ryziai", sg: "ryžis", pl: "ryžiai", gender: "m", emoji: "🍚" },
      { id: "makaronas", sg: "makaronas", pl: "makaronai", gender: "m", emoji: "🍝" }
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
