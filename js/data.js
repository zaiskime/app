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
      { id: "truisis", sg: "triušis", pl: "triušiai", gender: "m", emoji: "🐰" },
      { id: "lape", sg: "lapė", pl: "lapės", gender: "f", emoji: "🦊" },
      { id: "vilkas", sg: "vilkas", pl: "vilkai", gender: "m", emoji: "🐺" },
      { id: "meska", sg: "meška", pl: "meškos", gender: "f", emoji: "🐻" },
      { id: "ezys", sg: "ežys", pl: "ežiai", gender: "m", emoji: "🦔" },
      { id: "voveraite", sg: "voveraitė", pl: "voveraitės", gender: "f", emoji: "🐿️" },
      { id: "bebras", sg: "bebras", pl: "bebrai", gender: "m", emoji: "🦫" },
      { id: "briedis", sg: "briedis", pl: "briedžiai", gender: "m", emoji: "🫎" },
      { id: "varle", sg: "varlė", pl: "varlės", gender: "f", emoji: "🐸" },
      { id: "vezys", sg: "vėžys", pl: "vėžiai", gender: "m", emoji: "🦞" },
      { id: "avinas", sg: "avinas", pl: "avinai", gender: "m", emoji: "🐏" },
      { id: "ozka", sg: "ožka", pl: "ožkos", gender: "f", emoji: "🐐" },
      { id: "gaidys", sg: "gaidys", pl: "gaidžiai", gender: "m", emoji: "🐓" },
      { id: "vista", sg: "višta", pl: "vištos", gender: "f", emoji: "🐔" },
      { id: "antis", sg: "antis", pl: "antys", gender: "f", emoji: "🦆" },
      { id: "zasis", sg: "žąsis", pl: "žąsys", gender: "f", emoji: "🪿" },
      { id: "peleda", sg: "pelėda", pl: "pelėdos", gender: "f", emoji: "🦉" },
      { id: "bite", sg: "bitė", pl: "bitės", gender: "f", emoji: "🐝" },
      { id: "drugelis", sg: "drugelis", pl: "drugeliai", gender: "m", emoji: "🦋" },
      { id: "sraige", sg: "sraigė", pl: "sraigės", gender: "f", emoji: "🐌" }
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
      { id: "cesnakas", sg: "česnakas", pl: "česnakai", gender: "m", emoji: "🧄" },
      { id: "brokolis", sg: "brokolis", pl: "brokoliai", gender: "m", emoji: "🥦" },
      { id: "baklazanas", sg: "baklažanas", pl: "baklažanai", gender: "m", emoji: "🍆" },
      { id: "moliugas", sg: "moliūgas", pl: "moliūgai", gender: "m", emoji: "🎃" },
      { id: "cukinija", sg: "cukinija", pl: "cukinijos", gender: "f", emoji: "🥒" },
      { id: "kukuruzas", sg: "kukurūzas", pl: "kukurūzai", gender: "m", emoji: "🌽" },
      { id: "zirnis", sg: "žirnis", pl: "žirniai", gender: "m", emoji: "🫛" },
      { id: "pupa", sg: "pupa", pl: "pupos", gender: "f", emoji: "🫘" },
      { id: "grybas", sg: "grybas", pl: "grybai", gender: "m", emoji: "🍄‍🟫" },
      { id: "riesutas", sg: "riešutas", pl: "riešutai", gender: "m", emoji: "🥜" },
      { id: "avokadas", sg: "avokadas", pl: "avokadai", gender: "m", emoji: "🥑" },
      { id: "alyvuoge", sg: "alyvuogė", pl: "alyvuogės", gender: "f", emoji: "🫒" }
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
      { id: "lempa", sg: "lempa", pl: "lempos", gender: "f", emoji: "💡" },
      { id: "kuprine", sg: "kuprinė", pl: "kuprinės", gender: "f", emoji: "🎒" },
      { id: "zirkles", sg: "žirklės", pl: "žirklės", gender: "f", emoji: "✂️" },
      { id: "piestukas", sg: "pieštukas", pl: "pieštukai", gender: "m", emoji: "✏️" },
      { id: "rasiklis", sg: "rašiklis", pl: "rašikliai", gender: "m", emoji: "🖊️" },
      { id: "sasiuvinis", sg: "sąsiuvinis", pl: "sąsiuviniai", gender: "m", emoji: "📓" },
      { id: "telefonas", sg: "telefonas", pl: "telefonai", gender: "m", emoji: "📱" },
      { id: "kompiuteris", sg: "kompiuteris", pl: "kompiuteriai", gender: "m", emoji: "💻" },
      { id: "televizorius", sg: "televizorius", pl: "televizoriai", gender: "m", emoji: "📺" },
      { id: "puodelis", sg: "puodelis", pl: "puodeliai", gender: "m", emoji: "☕" },
      { id: "peilis", sg: "peilis", pl: "peiliai", gender: "m", emoji: "🔪" },
      { id: "saukstas", sg: "šaukštas", pl: "šaukštai", gender: "m", emoji: "🥄" },
      { id: "veidrodis", sg: "veidrodis", pl: "veidrodžiai", gender: "m", emoji: "🪞" },
      { id: "sketis", sg: "skėtis", pl: "skėčiai", gender: "m", emoji: "☂️" },
      { id: "deze", sg: "dėžė", pl: "dėžės", gender: "f", emoji: "📦" },
      { id: "zibintuvas", sg: "žibintuvas", pl: "žibintuvai", gender: "m", emoji: "🔦" }
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
      { id: "dantis", sg: "dantis", pl: "dantys", gender: "m", emoji: "🦷" },
      { id: "pirstas", sg: "pirštas", pl: "pirštai", gender: "m", emoji: "☝️" },
      { id: "sirdis", sg: "širdis", pl: "širdys", gender: "f", emoji: "❤️" },
      { id: "smegenys", sg: "smegenys", pl: "smegenys", gender: "f", emoji: "🧠" },
      { id: "kaulas", sg: "kaulas", pl: "kaulai", gender: "m", emoji: "🦴" },
      { id: "peda", sg: "pėda", pl: "pėdos", gender: "f", emoji: "🦶" }
    ]
  },
  {
    id: "clothes",
    nameLt: "Drabužiai",
    icon: "👕",
    color: "#8B6BB5",
    nouns: [
      { id: "kelnes", sg: "kelnės", pl: "kelnės", gender: "f", emoji: "👖" },
      { id: "suknele", sg: "suknelė", pl: "suknelės", gender: "f", emoji: "👗" },
      { id: "marskiniai", sg: "marškiniai", pl: "marškiniai", gender: "m", emoji: "👔" },
      { id: "svarkas", sg: "švarkas", pl: "švarkai", gender: "m", emoji: "🧥" },
      { id: "batas", sg: "batas", pl: "batai", gender: "m", emoji: "👞" },
      { id: "slepete", sg: "šlepetė", pl: "šlepetės", gender: "f", emoji: "🩴" },
      { id: "aulinukas", sg: "aulinukas", pl: "aulinukai", gender: "m", emoji: "🥾" },
      { id: "kepuraite", sg: "kepuraitė", pl: "kepuraitės", gender: "f", emoji: "👒" },
      { id: "skarele", sg: "skarelė", pl: "skarelės", gender: "f", emoji: "🧣" },
      { id: "akiniai", sg: "akiniai", pl: "akiniai", gender: "m", emoji: "👓" },
      { id: "dirzas", sg: "diržas", pl: "diržai", gender: "m", emoji: "🦺" },
      { id: "sortai", sg: "šortai", pl: "šortai", gender: "m", emoji: "🩳" },
      { id: "maudymukas", sg: "maudymukas", pl: "maudymukai", gender: "m", emoji: "🩱" },
      { id: "kepure", sg: "kepurė", pl: "kepurės", gender: "f", emoji: "🧢" },
      { id: "striuke", sg: "striukė", pl: "striukės", gender: "f", emoji: "🥼" },
      { id: "pirstine", sg: "pirštinė", pl: "pirštinės", gender: "f", emoji: "🧤" },
      { id: "kojine", sg: "kojinė", pl: "kojinės", gender: "f", emoji: "🧦" },
      { id: "karuna", sg: "karūna", pl: "karūnos", gender: "f", emoji: "👑" }
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
      { id: "debesys", sg: "debesis", pl: "debesys", gender: "m", emoji: "☁️" },
      { id: "uola", sg: "uola", pl: "uolos", gender: "f", emoji: "🪨" },
      { id: "banga", sg: "banga", pl: "bangos", gender: "f", emoji: "🌊" },
      { id: "kalnas", sg: "kalnas", pl: "kalnai", gender: "m", emoji: "⛰️" },
      { id: "miskas", sg: "miškas", pl: "miškai", gender: "m", emoji: "🌲" }
    ]
  },
  {
    id: "food",
    nameLt: "Maistas",
    icon: "🍞",
    color: "#D4915E",
    nouns: [
      { id: "duona", sg: "duona", pl: "duonos", gender: "f", emoji: "🍞" },
      { id: "suris", sg: "sūris", pl: "sūriai", gender: "m", emoji: "🧀" },
      { id: "pienas", sg: "pienas", pl: "pienai", gender: "m", emoji: "🥛" },
      { id: "sriuba", sg: "sriuba", pl: "sriubos", gender: "f", emoji: "🍲" },
      { id: "mesa", sg: "mėsa", pl: "mėsos", gender: "f", emoji: "🥩" },
      { id: "kiausinis", sg: "kiaušinis", pl: "kiaušiniai", gender: "m", emoji: "🥚" },
      { id: "ryziai", sg: "ryžiai", pl: "ryžiai", gender: "m", emoji: "🍚" },
      { id: "makaronas", sg: "makaronas", pl: "makaronai", gender: "m", emoji: "🍝" }
    ]
  }
];

// Difficulty levels mapped to the Lithuanian primary-school class system.
// maxQuantity caps how high numbers go; phraseTypes controls which grammatical
// patterns appear (younger levels skip the hardest triple combo).
const LEVELS = [
  { id: 1, nameLt: "1 klasė", roundLength: 4, maxQuantity: 3, phraseTypes: ["adj_noun"] },
  { id: 2, nameLt: "2 klasė", roundLength: 5, maxQuantity: 5, phraseTypes: ["adj_noun", "num_noun"] },
  { id: 3, nameLt: "3 klasė", roundLength: 7, maxQuantity: 7, phraseTypes: ["adj_noun", "num_noun", "num_adj_noun"] },
  { id: 4, nameLt: "4 klasė", roundLength: 9, maxQuantity: 9, phraseTypes: ["adj_noun", "num_noun", "num_adj_noun"] }
];
