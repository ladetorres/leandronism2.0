// Type constants
export const typeNormal = 'normal'
export const typeFire = 'fire'
export const typeWater = 'water'
export const typeGrass = 'grass'
export const typeElectric = 'electric'
export const typeIce = 'ice'
export const typeFighting = 'fighting'
export const typePoison = 'poison'
export const typeGround = 'ground'
export const typeFlying = 'flying'
export const typePsychic = 'psychic'
export const typeBug = 'bug'
export const typeRock = 'rock'
export const typeGhost = 'ghost'
export const typeDragon = 'dragon'
export const typeDark = 'dark'
export const typeSteel = 'steel'
export const typeFairy = 'fairy'

// Display order (matches type constant declaration order)
export const TYPE_ORDER = [
  typeNormal,
  typeFire,
  typeWater,
  typeGrass,
  typeElectric,
  typeIce,
  typeFighting,
  typePoison,
  typeGround,
  typeFlying,
  typePsychic,
  typeBug,
  typeRock,
  typeGhost,
  typeDragon,
  typeDark,
  typeSteel,
  typeFairy,
]

// Type effectiveness data
export const pokemonTypes = {
  [typeNormal]: {
    backgroundColor: '#A8A878',
    strongAgainst: [],
    weakAgainst: [typeRock, typeSteel],
    noDamage: [typeGhost],
  },
  [typeFire]: {
    backgroundColor: '#F08030',
    strongAgainst: [typeGrass, typeIce, typeBug, typeSteel],
    weakAgainst: [typeFire, typeWater, typeRock, typeDragon],
    noDamage: [],
  },
  [typeWater]: {
    backgroundColor: '#6890F0',
    strongAgainst: [typeFire, typeGround, typeRock],
    weakAgainst: [typeWater, typeGrass, typeDragon],
    noDamage: [],
  },
  [typeGrass]: {
    backgroundColor: '#78C850',
    strongAgainst: [typeWater, typeGround, typeRock],
    weakAgainst: [typeFire, typeGrass, typePoison, typeFlying, typeBug, typeDragon, typeSteel],
    noDamage: [],
  },
  [typeElectric]: {
    backgroundColor: '#F8D030',
    strongAgainst: [typeWater, typeFlying],
    weakAgainst: [typeElectric, typeGrass, typeDragon],
    noDamage: [typeGround],
  },
  [typeIce]: {
    backgroundColor: '#98D8D8',
    strongAgainst: [typeGrass, typeGround, typeFlying, typeDragon],
    weakAgainst: [typeFire, typeWater, typeIce, typeSteel],
    noDamage: [],
  },
  [typeFighting]: {
    backgroundColor: '#C03028',
    strongAgainst: [typeNormal, typeIce, typeRock, typeDark, typeSteel],
    weakAgainst: [typePoison, typeFlying, typePsychic, typeBug, typeFairy],
    noDamage: [typeGhost],
  },
  [typePoison]: {
    backgroundColor: '#A040A0',
    strongAgainst: [typeGrass, typeFairy],
    weakAgainst: [typePoison, typeGround, typeRock, typeGhost],
    noDamage: [typeSteel],
  },
  [typeGround]: {
    backgroundColor: '#E0C068',
    strongAgainst: [typeFire, typeElectric, typePoison, typeRock, typeSteel],
    weakAgainst: [typeGrass, typeBug],
    noDamage: [typeFlying],
  },
  [typeFlying]: {
    backgroundColor: '#A890F0',
    strongAgainst: [typeGrass, typeFighting, typeBug],
    weakAgainst: [typeElectric, typeRock, typeSteel],
    noDamage: [],
  },
  [typePsychic]: {
    backgroundColor: '#F85888',
    strongAgainst: [typeFighting, typePoison],
    weakAgainst: [typePsychic, typeSteel],
    noDamage: [typeDark],
  },
  [typeBug]: {
    backgroundColor: '#A8B820',
    strongAgainst: [typeGrass, typePsychic, typeDark],
    weakAgainst: [typeFire, typeFighting, typePoison, typeFlying, typeGhost, typeSteel, typeFairy],
    noDamage: [],
  },
  [typeRock]: {
    backgroundColor: '#B8A038',
    strongAgainst: [typeFire, typeIce, typeFlying, typeBug],
    weakAgainst: [typeFighting, typeGround, typeSteel],
    noDamage: [],
  },
  [typeGhost]: {
    backgroundColor: '#705898',
    strongAgainst: [typePsychic, typeGhost],
    weakAgainst: [typeDark],
    noDamage: [typeNormal],
  },
  [typeDragon]: {
    backgroundColor: '#7038F8',
    strongAgainst: [typeDragon],
    weakAgainst: [typeSteel],
    noDamage: [typeFairy],
  },
  [typeDark]: {
    backgroundColor: '#705848',
    strongAgainst: [typePsychic, typeGhost],
    weakAgainst: [typeFighting, typeDark, typeFairy],
    noDamage: [],
  },
  [typeSteel]: {
    backgroundColor: '#B8B8D0',
    strongAgainst: [typeIce, typeRock, typeFairy],
    weakAgainst: [typeFire, typeWater, typeElectric, typeSteel],
    noDamage: [],
  },
  [typeFairy]: {
    backgroundColor: '#EE99AC',
    strongAgainst: [typeFighting, typeDragon, typeDark],
    weakAgainst: [typeFire, typePoison, typeSteel],
    noDamage: [],
  },
}
