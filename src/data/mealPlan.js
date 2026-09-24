// Dados extraídos do README.md (macros_dieta.md original)
export const MEAL_SLOTS = [
  {
    key: 'cafeDaManha',
    label: 'Café da manhã',
    emoji: '🍳',
    optionsKey: 'cafeDaManha',
  },
  {
    key: 'almoco',
    label: 'Almoço',
    emoji: '🍛',
    optionsKey: 'almocoJanta',
  },
  {
    key: 'lancheDaTarde',
    label: 'Lanche da tarde',
    emoji: '🥪',
    optionsKey: 'lancheDaTarde',
  },
  {
    key: 'janta',
    label: 'Janta',
    emoji: '🍛',
    optionsKey: 'almocoJanta',
  },
]

export const MEAL_OPTIONS = {
  cafeDaManha: [
    {
      id: 'cafe-1',
      nome: '2 ovos + pão integral + banana',
      descricao: '2 ovos + 2 fatias pão integral + 1 banana + café',
      p: 22,
      c: 53,
      g: 14,
      kcal: 430,
    },
    {
      id: 'cafe-2',
      nome: 'Aveia + leite + whey + banana',
      descricao: '60 g aveia + 300 ml leite semidesnatado + 1 banana + 25 g whey',
      p: 40,
      c: 76,
      g: 10,
      kcal: 540,
    },
  ],
  almocoJanta: [
    {
      id: 'almoco-1',
      nome: 'Arroz, feijão e frango',
      descricao:
        '170 g arroz + 120 g feijão + 180 g peito de frango + 150–200 g salada/legumes',
      obs: 'Alternativa: 55 g de proteína de outra fonte animal.',
      p: 70,
      c: 75,
      g: 9,
      kcal: 690,
    },
    {
      id: 'almoco-2',
      nome: 'Massa com frango',
      descricao:
        '220 g massa cozida + 170 g peito de frango + 100 g molho de tomate + 150 g legumes + 10 g parmesão',
      p: 70,
      c: 75,
      g: 10,
      kcal: 690,
    },
    {
      id: 'almoco-3',
      nome: 'Arroz, batata e carne',
      descricao: '130 g arroz + 150 g batata + 170 g carne magra + bastante salada/legumes',
      p: 55,
      c: 65,
      g: 14,
      kcal: 620,
    },
  ],
  lancheDaTarde: [
    {
      id: 'lanche-1',
      nome: 'Sanduíche de frango',
      descricao: '2 fatias pão integral + 100 g frango desfiado + 30 g queijo + alface/tomate + 1 fruta',
      p: 44,
      c: 55,
      g: 13,
      kcal: 510,
    },
    {
      id: 'lanche-2',
      nome: 'Whey, aveia e banana',
      descricao: '30 g whey + 300 ml leite + 30 g aveia + 1 banana + 12 g chia/linhaça moída',
      p: 40,
      c: 55,
      g: 13,
      kcal: 500,
    },
    {
      id: 'lanche-3',
      nome: 'Sanduíche de atum',
      descricao: '3 fatias pão integral + 1 lata de atum em água + 20 g maionese light ou iogurte + tomate/alface + 1 fruta',
      p: 38,
      c: 60,
      g: 10,
      kcal: 480,
    },
  ],
}

export function getOption(optionsKey, id) {
  return MEAL_OPTIONS[optionsKey]?.find((o) => o.id === id) ?? null
}
