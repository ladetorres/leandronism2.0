// Nav bar display strings for Pokemon Party game

export const NAV_SELECT_GAME_MODE = "Select game mode."
export const NAV_CAPTAINS_MODE = "Welcome to Captain's mode! Select who picks first."
export const NAV_SELECT_YOUR_PARTY = "Select your party of six."
export const NAV_COMPUTER_SELECTS = "Computer selects their party!"
export const NAV_CAPTAINS_YOUR_PICK = "Captain's Mode — your turn to pick."
export const NAV_CAPTAINS_COMPUTER_PICK = "Captain's Mode — computer is picking."

// State 3 - match substates
export const NAV_MATCH_MESSAGES = {
  3.1: "First match! Select your first pokemon.",
  3.101: "First match. Computer is selecting.",
  3.102: "First match. Determining the winner.",
  3.103: "First match. Result!",
  3.104: "Second match. Computer picks first.",
  3.105: "Second match. Your turn to pick.",
  3.106: "Second match. Determining the winner.",
  3.107: "Second match. Result!",
  3.108: "Third match! Select your pokemon.",
  3.109: "Third match. Computer is selecting.",
  3.110: "Third match. Determining the winner.",
  3.111: "Third match. Result!",
  3.112: "Fourth match. Computer picks first.",
  3.113: "Fourth match. Your turn to pick.",
  3.114: "Fourth match. Determining the winner.",
  3.115: "Fourth match. Result!",
  3.116: "Fifth match! Select your pokemon.",
  3.117: "Fifth match. Computer is selecting.",
  3.118: "Fifth match. Determining the winner.",
  3.119: "Fifth match. Result!",
}

// Legacy exports (kept for any remaining imports)
export const NAV_FIRST_MATCH = NAV_MATCH_MESSAGES[3.1]
export const NAV_FIRST_MATCH_COMPUTER_SELECTING = NAV_MATCH_MESSAGES[3.101]
export const NAV_FIRST_MATCH_RESOLVING = NAV_MATCH_MESSAGES[3.102]
export const NAV_FIRST_MATCH_RESULT = NAV_MATCH_MESSAGES[3.103]
export const NAV_SECOND_MATCH = NAV_MATCH_MESSAGES[3.104]
export const NAV_SECOND_MATCH_YOUR_TURN = NAV_MATCH_MESSAGES[3.105]

// Function to generate computer selection message
export const getComputerSelectedMessage = (pokemonName) => {
  return `Computer selected ${pokemonName}.`
}
