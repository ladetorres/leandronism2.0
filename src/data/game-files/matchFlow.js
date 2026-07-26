// Five-match flow for Pokemon Party (state 3)
// Odd matches: player picks first. Even matches: computer picks first.

// Player confirm (check) → next substate
export const PLAYER_PICK_NEXT = {
  3.1: 3.101,   // match 1 → computer responds
  3.105: 3.106, // match 2 → resolve (computer already picked)
  3.108: 3.109, // match 3 → computer responds
  3.113: 3.114, // match 4 → resolve
  3.116: 3.117, // match 5 → computer responds
}

// Computer responds after player already picked → resolve
export const COMPUTER_RESPOND_NEXT = {
  3.101: 3.102,
  3.109: 3.110,
  3.117: 3.118,
}

// Computer picks first (clears previews) → player pick
export const COMPUTER_FIRST_NEXT = {
  3.104: 3.105,
  3.112: 3.113,
}

// Resolve loading → result display
export const RESOLVE_NEXT = {
  3.102: 3.103,
  3.106: 3.107,
  3.110: 3.111,
  3.114: 3.115,
  3.118: 3.119,
}

// Result idle → next match start, or null for end (state 4)
export const RESULT_NEXT = {
  3.103: 3.104,
  3.107: 3.108,
  3.111: 3.112,
  3.115: 3.116,
  3.119: null,
}

export const PLAYER_TURN_SUBSTATES = Object.keys(PLAYER_PICK_NEXT).map(Number)
export const COMPUTER_RESPOND_SUBSTATES = Object.keys(COMPUTER_RESPOND_NEXT).map(Number)
export const COMPUTER_FIRST_SUBSTATES = Object.keys(COMPUTER_FIRST_NEXT).map(Number)
export const COMPUTER_TURN_SUBSTATES = [
  ...COMPUTER_RESPOND_SUBSTATES,
  ...COMPUTER_FIRST_SUBSTATES,
]
export const RESOLVE_SUBSTATES = Object.keys(RESOLVE_NEXT).map(Number)
export const RESULT_SUBSTATES = Object.keys(RESULT_NEXT).map(Number)

export const isPlayerTurn = (substate) => PLAYER_TURN_SUBSTATES.includes(substate)
export const isComputerTurn = (substate) => COMPUTER_TURN_SUBSTATES.includes(substate)
export const isResolveSubstate = (substate) => RESOLVE_SUBSTATES.includes(substate)
export const isResultSubstate = (substate) => RESULT_SUBSTATES.includes(substate)
export const isComputerFirstSubstate = (substate) => COMPUTER_FIRST_SUBSTATES.includes(substate)
export const isComputerRespondSubstate = (substate) => COMPUTER_RESPOND_SUBSTATES.includes(substate)
