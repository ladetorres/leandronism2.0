// Captain's Mode draft: A - BB - AA - BB - AAA - BB
// Pick First (2.2…): player is A. Pick Last (2.3…): player is B.

export const CAPTAINS_PICK_FIRST_FLOW = {
  2.2: { actor: 'player', next: 2.201 },
  2.201: { actor: 'computer', next: 2.202 },
  2.202: { actor: 'computer', next: 2.203 },
  2.203: { actor: 'player', next: 2.204 },
  2.204: { actor: 'player', next: 2.205 },
  2.205: { actor: 'computer', next: 2.206 },
  2.206: { actor: 'computer', next: 2.207 },
  2.207: { actor: 'player', next: 2.208 },
  2.208: { actor: 'player', next: 2.209 },
  2.209: { actor: 'player', next: 2.210 },
  2.210: { actor: 'computer', next: 2.211 },
  2.211: { actor: 'computer', next: null },
}

export const CAPTAINS_PICK_LAST_FLOW = {
  2.3: { actor: 'computer', next: 2.301 },
  2.301: { actor: 'player', next: 2.302 },
  2.302: { actor: 'player', next: 2.303 },
  2.303: { actor: 'computer', next: 2.304 },
  2.304: { actor: 'computer', next: 2.305 },
  2.305: { actor: 'player', next: 2.306 },
  2.306: { actor: 'player', next: 2.307 },
  2.307: { actor: 'computer', next: 2.308 },
  2.308: { actor: 'computer', next: 2.309 },
  2.309: { actor: 'computer', next: 2.310 },
  2.310: { actor: 'player', next: 2.311 },
  2.311: { actor: 'player', next: null },
}

export function getCaptainsStep(substate) {
  return CAPTAINS_PICK_FIRST_FLOW[substate] ?? CAPTAINS_PICK_LAST_FLOW[substate] ?? null
}

export function isCaptainsDraftSubstate(substate) {
  return getCaptainsStep(substate) !== null
}

export function isCaptainsPlayerPick(substate) {
  return getCaptainsStep(substate)?.actor === 'player'
}

export function isCaptainsComputerPick(substate) {
  return getCaptainsStep(substate)?.actor === 'computer'
}

export function getCaptainsNext(substate) {
  return getCaptainsStep(substate)?.next
}
