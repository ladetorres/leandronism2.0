import { pokemonTypes } from './types'

class Pokemon {
  constructor(id, name, types, spriteFileName = '', spriteFileNameStatic = '') {
    this.id = id
    this.name = name
    this.types = types // array of type constants
    this.spriteFileName = spriteFileName
    this.spriteFileNameStatic = spriteFileNameStatic
  }

  hasType(type) {
    return this.types.includes(type)
  }

  getSpritePath() {
    return this.spriteFileName ? `/sprites/${this.spriteFileName}` : ''
  }
}

/**
 * Calculate type effectiveness of an attack against defending types
 * @param {string} attackType - The attacking type
 * @param {string[]} defendingTypes - Array of defending types (1-2 types)
 * @returns {number} Damage multiplier (0, 0.25, 0.5, 1, 2, or 4)
 */
export function duelTypes(attackType, defendingTypes) {
  // Start with score of 1
  let score = 1

  // Get the attack type's effectiveness data
  const attackData = pokemonTypes[attackType]

  // Check if any defending type is in noDamage - if so, return 0
  for (const defType of defendingTypes) {
    if (attackData.noDamage.includes(defType)) {
      return 0
    }
  }

  // Calculate damage multiplier for each defending type
  for (const defType of defendingTypes) {
    if (attackData.strongAgainst.includes(defType)) {
      score *= 2
    } else if (attackData.weakAgainst.includes(defType)) {
      score *= 0.5
    }
  }

  return score
}

/**
 * Determine which Pokemon has type advantage in a head-to-head matchup
 * @param {Pokemon} pokemonA - First Pokemon
 * @param {Pokemon} pokemonB - Second Pokemon
 * @returns {number|null} Winning Pokemon's ID, or null if tie
 */
export function duelPokemons(pokemonA, pokemonB) {
  // Calculate max score for Pokemon A attacking Pokemon B
  let maxScoreA = 0
  for (const attackType of pokemonA.types) {
    const score = duelTypes(attackType, pokemonB.types)
    maxScoreA = Math.max(maxScoreA, score)
  }

  // Calculate max score for Pokemon B attacking Pokemon A
  let maxScoreB = 0
  for (const attackType of pokemonB.types) {
    const score = duelTypes(attackType, pokemonA.types)
    maxScoreB = Math.max(maxScoreB, score)
  }

  // Compare and return winner
  if (maxScoreA > maxScoreB) {
    return pokemonA.id
  } else if (maxScoreB > maxScoreA) {
    return pokemonB.id
  } else {
    return null // tie
  }
}

/**
 * Pick an attacking Pokemon that beats as many defenders as possible.
 * Prefers one that wins vs at least 2 defenders, then at least 1, else random.
 * @param {Pokemon[]} defendPokemonList
 * @param {Pokemon[]} availableAttackPool
 * @returns {number|null} Selected Pokemon ID, or null if the attack pool is empty
 */
export function selectBestPokemon(defendPokemonList, availableAttackPool) {
  if (!availableAttackPool.length) {
    return null
  }

  for (const pokemonAttack of availableAttackPool) {
    const beaten = []
    for (const defendPokemon of defendPokemonList) {
      if (duelPokemons(pokemonAttack, defendPokemon) === pokemonAttack.id) {
        beaten.push(defendPokemon)
      }
    }
    if (beaten.length >= 2) {
      const vsList = beaten.map(p => p.name).join(' and ')
      console.log(`${pokemonAttack.name} selected. good vs ${vsList}`)
      return pokemonAttack.id
    }
  }

  for (const pokemonAttack of availableAttackPool) {
    const beaten = []
    for (const defendPokemon of defendPokemonList) {
      if (duelPokemons(pokemonAttack, defendPokemon) === pokemonAttack.id) {
        beaten.push(defendPokemon)
      }
    }
    if (beaten.length >= 1) {
      console.log(`${pokemonAttack.name} selected. good vs ${beaten[0].name}`)
      return pokemonAttack.id
    }
  }

  const randomIndex = Math.floor(Math.random() * availableAttackPool.length)
  const randomPokemon = availableAttackPool[randomIndex]
  console.log(`${randomPokemon.name} defaulted at random`)
  return randomPokemon.id
}

class PokemonMatchUpResult {
  constructor(matchID, playerPokemon, computerPokemon, winner = null, note = null) {
    this.matchID = matchID
    this.playerPokemon = playerPokemon
    this.computerPokemon = computerPokemon
    this.winner = winner // string, nullable
    this.note = note // string, nullable
  }
}

export { PokemonMatchUpResult }
export default Pokemon
