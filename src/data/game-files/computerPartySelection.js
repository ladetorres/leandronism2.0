// Computer party pick strategy for each selection (1–6) by difficulty.
// Values: 'random' | 'selectBestPokemon'

export const COMPUTER_PICK_RANDOM = 'random'
export const COMPUTER_PICK_SELECT_BEST = 'selectBestPokemon'

// gameDifficulty integers used by PokemonParty
export const DIFFICULTY_TRAINER = 1
export const DIFFICULTY_GYM_LEADER = 2
export const DIFFICULTY_CHAMPION = 3

export const COMPUTER_PARTY_SELECTION = {
  trainer: {
    1: COMPUTER_PICK_RANDOM,
    2: COMPUTER_PICK_RANDOM,
    3: COMPUTER_PICK_RANDOM,
    4: COMPUTER_PICK_RANDOM,
    5: COMPUTER_PICK_RANDOM,
    6: COMPUTER_PICK_SELECT_BEST,
  },
  gymLeader: {
    1: COMPUTER_PICK_SELECT_BEST,
    2: COMPUTER_PICK_RANDOM,
    3: COMPUTER_PICK_SELECT_BEST,
    4: COMPUTER_PICK_RANDOM,
    5: COMPUTER_PICK_RANDOM,
    6: COMPUTER_PICK_RANDOM,
  },
  champion: {
    1: COMPUTER_PICK_SELECT_BEST,
    2: COMPUTER_PICK_RANDOM,
    3: COMPUTER_PICK_SELECT_BEST,
    4: COMPUTER_PICK_RANDOM,
    5: COMPUTER_PICK_SELECT_BEST,
    6: COMPUTER_PICK_SELECT_BEST,
  },
}

const DIFFICULTY_KEY = {
  [DIFFICULTY_TRAINER]: 'trainer',
  [DIFFICULTY_GYM_LEADER]: 'gymLeader',
  [DIFFICULTY_CHAMPION]: 'champion',
}

/** @returns {'random' | 'selectBestPokemon'} */
export function getComputerPartyPickStrategy(gameDifficulty, selectionNumber) {
  const key = DIFFICULTY_KEY[gameDifficulty] ?? 'gymLeader'
  return COMPUTER_PARTY_SELECTION[key][selectionNumber] ?? COMPUTER_PICK_RANDOM
}

// Match pick strategy when computer picks first (even matches)
export const COMPUTER_MATCH_PICK_FIRST = {
  trainer: COMPUTER_PICK_RANDOM,
  gymLeader: COMPUTER_PICK_RANDOM,
  champion: COMPUTER_PICK_SELECT_BEST,
}

// Match pick strategy when computer responds after player picks first
export const COMPUTER_MATCH_PICK_RESPOND = {
  trainer: COMPUTER_PICK_RANDOM,
  gymLeader: COMPUTER_PICK_SELECT_BEST,
  champion: COMPUTER_PICK_SELECT_BEST,
}

/** @returns {'random' | 'selectBestPokemon'} */
export function getComputerMatchPickFirstStrategy(gameDifficulty) {
  const key = DIFFICULTY_KEY[gameDifficulty] ?? 'gymLeader'
  return COMPUTER_MATCH_PICK_FIRST[key] ?? COMPUTER_PICK_RANDOM
}

/** @returns {'random' | 'selectBestPokemon'} */
export function getComputerMatchPickRespondStrategy(gameDifficulty) {
  const key = DIFFICULTY_KEY[gameDifficulty] ?? 'gymLeader'
  return COMPUTER_MATCH_PICK_RESPOND[key] ?? COMPUTER_PICK_RANDOM
}
