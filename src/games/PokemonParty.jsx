import { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import Pokemon, { PokemonMatchUpResult, duelPokemons, selectBestPokemon } from '../data/Pokemon'
import { pokemonList } from '../data/game-files/pocketParty'
import {
  DIFFICULTY_TRAINER,
  DIFFICULTY_GYM_LEADER,
  DIFFICULTY_CHAMPION,
  COMPUTER_PICK_SELECT_BEST,
  getComputerPartyPickStrategy,
  getComputerMatchPickFirstStrategy,
  getComputerMatchPickRespondStrategy,
} from '../data/game-files/computerPartySelection'
import { pokemonTypes } from '../data/types'
import SpriteAnimation from '../components/SpriteAnimation'
import PixelLoading from '../components/PixelLoading'
import TypeEffectivenessChart from '../components/TypeEffectivenessChart'
import GameInstructions from '../components/GameInstructions'

function createRandomPokemonPool() {
  const shuffled = [...pokemonList].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, 23)
  return selected.map(pokemon => ({
    pokemon,
    selectionState: null
  }))
}
import {
  NAV_SELECT_GAME_MODE,
  NAV_CAPTAINS_MODE,
  NAV_SELECT_YOUR_PARTY,
  NAV_COMPUTER_SELECTS,
  NAV_CAPTAINS_YOUR_PICK,
  NAV_CAPTAINS_COMPUTER_PICK,
  NAV_MATCH_MESSAGES,
  getComputerSelectedMessage
} from '../data/game-files/gameStrings'
import {
  PLAYER_PICK_NEXT,
  COMPUTER_RESPOND_NEXT,
  COMPUTER_FIRST_NEXT,
  RESOLVE_NEXT,
  RESULT_NEXT,
  isPlayerTurn,
  isComputerTurn,
  isResolveSubstate,
  isResultSubstate,
  isComputerFirstSubstate,
  isComputerRespondSubstate,
} from '../data/game-files/matchFlow'
import {
  isCaptainsPlayerPick,
  isCaptainsComputerPick,
  getCaptainsNext,
} from '../data/game-files/captainsModeFlow'

function PokemonParty() {
  // State variables
  const [state, setState] = useState(1)
  const [substate, setSubstate] = useState(0.0) // Changed to float
  const [gameDifficulty, setGameDifficulty] = useState(DIFFICULTY_GYM_LEADER)
  const [pokemonPool, setPokemonPool] = useState([])
  const [playerParty, setPlayerParty] = useState([])
  const [computerParty, setComputerParty] = useState([])
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [matchResults, setMatchResults] = useState([])
  const [pokemonSelectionPreview, setPokemonSelectionPreview] = useState(null) // Pokemon instance or null
  const computerSelectionTriggeredRef = useRef(false) // Track if we've started computer selection
  const computerPartyCountRef = useRef(0) // Track actual number of pokemon added
  const captainsComputerPickProcessedRef = useRef(null) // substate already processed (Strict Mode guard)
  const [navBarDisplay, setNavBarDisplay] = useState(null)
  const [playerMatchPreview, setPlayerMatchPreview] = useState(null) // For state 3 player selection
  const [computerMatchPreview, setComputerMatchPreview] = useState(null) // For state 3 computer selection
  const [currentMatchWinnerId, setCurrentMatchWinnerId] = useState(undefined) // id | null (tie) | undefined (no result yet)
  const [showTypeChart, setShowTypeChart] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const computerPartyRef = useRef(computerParty)
  const playerPartyRef = useRef(playerParty)
  const pokemonPoolRef = useRef(pokemonPool)
  const playerMatchPreviewRef = useRef(playerMatchPreview)
  const computerMatchPreviewRef = useRef(computerMatchPreview)
  const gameDifficultyRef = useRef(gameDifficulty)

  useEffect(() => {
    computerPartyRef.current = computerParty
  }, [computerParty])

  useEffect(() => {
    playerPartyRef.current = playerParty
  }, [playerParty])

  useEffect(() => {
    pokemonPoolRef.current = pokemonPool
  }, [pokemonPool])

  useEffect(() => {
    playerMatchPreviewRef.current = playerMatchPreview
  }, [playerMatchPreview])

  useEffect(() => {
    computerMatchPreviewRef.current = computerMatchPreview
  }, [computerMatchPreview])

  useEffect(() => {
    gameDifficultyRef.current = gameDifficulty
  }, [gameDifficulty])

  // Initial page load: populate pokemonPool with 23 random Pokemon
  useEffect(() => {
    const poolObjects = createRandomPokemonPool()
    setPokemonPool(poolObjects)
    console.log('Selected Pokemon Pool:', poolObjects.map(p => p.pokemon.name))
  }, [])

  const handleResetClick = () => {
    setState(1)
    setSubstate(0.0)
    setGameDifficulty(DIFFICULTY_GYM_LEADER)
    setPlayerParty([])
    setComputerParty([])
    setPlayerScore(0)
    setComputerScore(0)
    setMatchResults([])
    setPokemonSelectionPreview(null)
    setPlayerMatchPreview(null)
    setComputerMatchPreview(null)
    setCurrentMatchWinnerId(undefined)
    setNavBarDisplay(null)
    setShowTypeChart(false)
    setShowInstructions(false)
    computerSelectionTriggeredRef.current = false
    computerPartyCountRef.current = 0
    captainsComputerPickProcessedRef.current = null

    const poolObjects = createRandomPokemonPool()
    setPokemonPool(poolObjects)
    console.log('Game reset. New Pokemon Pool:', poolObjects.map(p => p.pokemon.name))
  }

  // Update navBarDisplay based on state changes
  useEffect(() => {
    if (state === 1) {
      setNavBarDisplay(NAV_SELECT_GAME_MODE)
    }
  }, [state])

  // Update navBarDisplay based on substate changes
  useEffect(() => {
    if (substate === 1.2) {
      setNavBarDisplay(NAV_CAPTAINS_MODE)
    } else if (substate === 2.1) {
      setNavBarDisplay(NAV_SELECT_YOUR_PARTY)
    } else if (substate === 2.4) {
      setNavBarDisplay(NAV_COMPUTER_SELECTS)
    } else if (isCaptainsPlayerPick(substate)) {
      setNavBarDisplay(NAV_CAPTAINS_YOUR_PICK)
    } else if (isCaptainsComputerPick(substate)) {
      setNavBarDisplay(NAV_CAPTAINS_COMPUTER_PICK)
    } else if (NAV_MATCH_MESSAGES[substate]) {
      setNavBarDisplay(NAV_MATCH_MESSAGES[substate])
    }
  }, [substate])

  const advanceToMatch = () => {
    setPokemonSelectionPreview(null)
    setState(3)
    setSubstate(3.1)
    console.log('State:', 3, 'Substate:', 3.1)
  }

  const advanceCaptainsDraft = (fromSubstate) => {
    const next = getCaptainsNext(fromSubstate)
    if (next === null || next === undefined) {
      advanceToMatch()
      return
    }
    setSubstate(next)
    console.log('Substate:', next)
  }

  // Handle game mode option clicks
  const handleFirstOptionClick = () => {
    setState(2)
    setSubstate(2.1)
    console.log('Substate:', 2.1)
  }

  const handleSecondOptionClick = () => {
    setSubstate(1.2)
    console.log('Substate:', 1.2)
  }

  const handleSmallOption1Click = () => {
    captainsComputerPickProcessedRef.current = null
    setState(2)
    setSubstate(2.2)
    console.log('Substate:', 2.2)
  }

  const handleSmallOption2Click = () => {
    captainsComputerPickProcessedRef.current = null
    setState(2)
    setSubstate(2.3)
    console.log('Substate:', 2.3)
  }

  // Handle pokemon selection from pool (classic 2.1 or captains player pick) - preview only
  const handlePoolPokemonClick = (poolIndex) => {
    const canClassicPick = substate === 2.1 && playerParty.length < 6
    const canCaptainsPick = isCaptainsPlayerPick(substate) && playerParty.length < 6
    if ((canClassicPick || canCaptainsPick) && pokemonPool[poolIndex].selectionState === null) {
      setPokemonSelectionPreview({
        pokemon: pokemonPool[poolIndex].pokemon,
        poolIndex: poolIndex,
        isFromParty: false
      })
    }
  }

  // Handle removing pokemon from player party (classic 2.1 only) - preview
  const handlePlayerPartyRemove = (partyIndex) => {
    if (substate === 2.1 && partyIndex < playerParty.length) {
      setPokemonSelectionPreview({
        pokemon: playerParty[partyIndex].pokemon,
        partyIndex: partyIndex,
        isFromParty: true
      })
    }
  }

  // Handle check button click (confirm selection or disabled for already-selected)
  const handleCheckClick = () => {
    if (!pokemonSelectionPreview) return
    if (substate === 2.4 || isCaptainsComputerPick(substate)) return

    if (!pokemonSelectionPreview.isFromParty) {
      // Add to player party
      const newPartyMember = {
        pokemon: pokemonSelectionPreview.pokemon,
        matchState: null
      }
      setPlayerParty([...playerParty, newPartyMember])

      // Update pool selection state
      const updatedPool = [...pokemonPool]
      updatedPool[pokemonSelectionPreview.poolIndex].selectionState = 'playerSelected'
      setPokemonPool(updatedPool)

      // Clear preview
      setPokemonSelectionPreview(null)

      if (isCaptainsPlayerPick(substate)) {
        advanceCaptainsDraft(substate)
      }
    }
    // If isFromParty is true, check button is disabled (do nothing)
  }

  // Handle cross button click (cancel preview or remove from party)
  const handleCrossClick = () => {
    if (!pokemonSelectionPreview) return
    if (substate === 2.4 || isCaptainsComputerPick(substate)) return

    if (pokemonSelectionPreview.isFromParty && substate === 2.1) {
      // Remove from player party (classic only)
      const removedPokemon = pokemonSelectionPreview.pokemon
      const updatedParty = playerParty.filter((_, index) => index !== pokemonSelectionPreview.partyIndex)
      setPlayerParty(updatedParty)

      // Reset selection state in pool
      const updatedPool = pokemonPool.map(poolItem => {
        if (poolItem.pokemon.id === removedPokemon.id) {
          return { ...poolItem, selectionState: null }
        }
        return poolItem
      })
      setPokemonPool(updatedPool)
    }

    // Clear preview in both cases
    setPokemonSelectionPreview(null)
  }

  // STATE 3 HANDLERS - Match selection
  const handlePlayerPartyMatchClick = (partyIndex) => {
    if (isPlayerTurn(substate) && partyIndex < playerParty.length) {
      const pokemon = playerParty[partyIndex]
      // Only allow selection if matchState is null
      if (pokemon.matchState === null) {
        setPlayerMatchPreview({
          pokemon: pokemon.pokemon,
          partyIndex: partyIndex
        })
      }
    }
  }

  const handlePlayerMatchCheckClick = () => {
    if (!playerMatchPreview) return

    const next = PLAYER_PICK_NEXT[substate]
    if (next !== undefined) {
      setSubstate(next)
      console.log('Substate:', next)
    }
  }

  // Reset computer selection flag when not in substate 2.4
  useEffect(() => {
    if (substate !== 2.4) {
      computerSelectionTriggeredRef.current = false
      computerPartyCountRef.current = 0
    }
  }, [substate])

  // Check if player party is full and update substate
  useEffect(() => {
    if (substate === 2.1 && playerParty.length === 6) {
      setSubstate(2.4)
      computerSelectionTriggeredRef.current = false
      computerPartyCountRef.current = 0
      console.log('Substate:', 2.4)
    }
  }, [playerParty, substate])

  // Computer selection - triggered only when substate becomes 2.4
  useEffect(() => {
    console.log('Effect ran: substate=', substate, 'triggered=', computerSelectionTriggeredRef.current)

    if (substate === 2.4 && !computerSelectionTriggeredRef.current) {
      console.log('Starting computer selection sequence')
      computerSelectionTriggeredRef.current = true
      computerPartyCountRef.current = 0

      const defendPokemonList = playerParty.map(item => item.pokemon)
      const difficulty = gameDifficulty

      const selectPokemon = (selectionNumber) => {
        console.log(`Attempting selection #${selectionNumber}, current count: ${computerPartyCountRef.current}`)

        // Add random delay 0-1 second before checking
        const randomDelay = Math.random() * 1000
        setTimeout(() => {
          // Proceed with pool selection
          setPokemonPool(currentPool => {
            // Check ref INSIDE the callback - this is synchronized
            if (computerPartyCountRef.current >= selectionNumber) {
              console.log(`Selection #${selectionNumber}: Already processed (count=${computerPartyCountRef.current}), skipping`)
              return currentPool
            }

            // Set ref immediately inside callback
            computerPartyCountRef.current = selectionNumber
            console.log(`Selection #${selectionNumber}: Processing, set count to ${selectionNumber}`)

            const available = currentPool
              .map((item, idx) => ({ item, idx }))
              .filter(({ item }) => item.selectionState === null)

            if (available.length === 0) {
              console.log(`Selection #${selectionNumber}: No available pokemon in pool`)
              return currentPool
            }

            const pickStrategy = getComputerPartyPickStrategy(difficulty, selectionNumber)
            let selected

            if (pickStrategy === COMPUTER_PICK_SELECT_BEST) {
              console.log(`Selection #${selectionNumber}: used selectBestPokemon`)
              const availableAttackPool = available.map(({ item }) => item.pokemon)
              const selectedId = selectBestPokemon(defendPokemonList, availableAttackPool)
              selected = available.find(({ item }) => item.pokemon.id === selectedId)
            } else {
              console.log(`Selection #${selectionNumber}: random`)
              const randomIdx = Math.floor(Math.random() * available.length)
              selected = available[randomIdx]
            }

            if (!selected) {
              console.log(`Selection #${selectionNumber}: Fallback to random`)
              selected = available[Math.floor(Math.random() * available.length)]
            }

            console.log(`Selection #${selectionNumber}: Selecting:`, selected.item.pokemon.name)

            // Update navBarDisplay with the selected pokemon name
            setNavBarDisplay(getComputerSelectedMessage(selected.item.pokemon.name))

            // Set as preview
            setPokemonSelectionPreview({
              pokemon: selected.item.pokemon,
              poolIndex: selected.idx,
              isFromParty: false
            })

            // Update pool - mark as selected
            const updatedPool = [...currentPool]
            updatedPool[selected.idx].selectionState = 'computerSelected'

            // Add to party
            setComputerParty(prev => [...prev, { pokemon: selected.item.pokemon, matchState: null }])

            return updatedPool
          })
        }, randomDelay)
      }

      // Selection 1
      setTimeout(() => {
        selectPokemon(1)

        // Selection 2
        setTimeout(() => {
          selectPokemon(2)

          // Selection 3
          setTimeout(() => {
            selectPokemon(3)

            // Selection 4
            setTimeout(() => {
              selectPokemon(4)

              // Selection 5
              setTimeout(() => {
                selectPokemon(5)

                // Selection 6
                setTimeout(() => {
                  selectPokemon(6)

                  // Wait 4 seconds, then move to state 3
                  setTimeout(() => {
                    advanceToMatch()
                  }, 4000)

                }, 3000 + Math.random() * 2000)
              }, 3000 + Math.random() * 2000)
            }, 3000 + Math.random() * 2000)
          }, 3000 + Math.random() * 2000)
        }, 3000 + Math.random() * 2000)
      }, 3000 + Math.random() * 2000)
    }
  }, [substate])

  // Captain's Mode — computer draft pick
  useEffect(() => {
    if (!isCaptainsComputerPick(substate)) return

    const fromSubstate = substate
    const difficulty = gameDifficultyRef.current
    let cancelled = false
    let advanceTimeoutId = null

    const initialDelay = 2000 + Math.random() * 1500
    const initialTimeoutId = setTimeout(() => {
      if (cancelled) return
      // Sync guard — do not rely on setState updater timing for advance
      if (captainsComputerPickProcessedRef.current === fromSubstate) return
      captainsComputerPickProcessedRef.current = fromSubstate

      const currentPool = pokemonPoolRef.current
      const available = currentPool
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => item.selectionState === null)

      if (available.length === 0) {
        console.log('Captains computer pick: no available pokemon')
        setPokemonSelectionPreview(null)
        advanceCaptainsDraft(fromSubstate)
        return
      }

      const selectionNumber = computerPartyRef.current.length + 1
      const pickStrategy = getComputerPartyPickStrategy(difficulty, selectionNumber)
      let selected

      if (pickStrategy === COMPUTER_PICK_SELECT_BEST) {
        console.log(`Captains computer pick #${selectionNumber}: used selectBestPokemon`)
        const defendPokemonList = playerPartyRef.current.map(item => item.pokemon)
        const availableAttackPool = available.map(({ item }) => item.pokemon)
        const selectedId = selectBestPokemon(defendPokemonList, availableAttackPool)
        selected = available.find(({ item }) => item.pokemon.id === selectedId)
      } else {
        console.log(`Captains computer pick #${selectionNumber}: random`)
        selected = available[Math.floor(Math.random() * available.length)]
      }

      if (!selected) {
        selected = available[Math.floor(Math.random() * available.length)]
      }

      console.log(`Captains computer pick #${selectionNumber}:`, selected.item.pokemon.name)
      setNavBarDisplay(getComputerSelectedMessage(selected.item.pokemon.name))
      setPokemonSelectionPreview({
        pokemon: selected.item.pokemon,
        poolIndex: selected.idx,
        isFromParty: false
      })

      const updatedPool = currentPool.map((item, idx) => (
        idx === selected.idx
          ? { ...item, selectionState: 'computerSelected' }
          : item
      ))
      pokemonPoolRef.current = updatedPool
      setPokemonPool(updatedPool)
      setComputerParty(prev => [...prev, { pokemon: selected.item.pokemon, matchState: null }])

      advanceTimeoutId = setTimeout(() => {
        if (cancelled) return
        setPokemonSelectionPreview(null)
        advanceCaptainsDraft(fromSubstate)
      }, 1500 + Math.random() * 1000)
    }, initialDelay)

    return () => {
      cancelled = true
      clearTimeout(initialTimeoutId)
      if (advanceTimeoutId) clearTimeout(advanceTimeoutId)
    }
  }, [substate])

  // Computer responds after player already picked
  useEffect(() => {
    if (!isComputerRespondSubstate(substate)) return

    const nextSubstate = COMPUTER_RESPOND_NEXT[substate]
    const initialDelay = 2000 + Math.random() * 1000
    let cancelled = false
    let finalTimeoutId = null

    const initialTimeoutId = setTimeout(() => {
      if (cancelled) return

      const availableComputer = computerPartyRef.current.filter(item => item.matchState === null)

      if (availableComputer.length === 0) {
        console.log('No available computer pokemon for respond pick')
        return
      }

      const strategy = getComputerMatchPickRespondStrategy(gameDifficultyRef.current)
      let selectedPokemon

      if (strategy === COMPUTER_PICK_SELECT_BEST) {
        const playerPreview = playerMatchPreviewRef.current
        if (!playerPreview?.pokemon) {
          console.log('No player preview for respond pick; falling back to random')
          selectedPokemon = availableComputer[Math.floor(Math.random() * availableComputer.length)]
          console.log('Computer respond pick: random')
        } else {
          console.log('Computer respond pick: used selectBestPokemon')
          const defendPokemonList = [playerPreview.pokemon]
          const availableAttackPool = availableComputer.map(item => item.pokemon)
          const selectedId = selectBestPokemon(defendPokemonList, availableAttackPool)
          selectedPokemon = availableComputer.find(item => item.pokemon.id === selectedId)
            ?? availableComputer[Math.floor(Math.random() * availableComputer.length)]
        }
      } else {
        console.log('Computer respond pick: random')
        selectedPokemon = availableComputer[Math.floor(Math.random() * availableComputer.length)]
      }

      console.log('Computer selected for match:', selectedPokemon.pokemon.name)

      setComputerMatchPreview({
        pokemon: selectedPokemon.pokemon
      })

      const finalDelay = Math.random() * 1000
      finalTimeoutId = setTimeout(() => {
        if (cancelled) return
        setSubstate(nextSubstate)
        console.log('Substate:', nextSubstate)
      }, finalDelay)
    }, initialDelay)

    return () => {
      cancelled = true
      clearTimeout(initialTimeoutId)
      if (finalTimeoutId) clearTimeout(finalTimeoutId)
    }
  }, [substate])

  // Computer picks first (even matches) — clear boards then pick
  useEffect(() => {
    if (!isComputerFirstSubstate(substate)) return

    const nextSubstate = COMPUTER_FIRST_NEXT[substate]

    setPlayerMatchPreview(null)
    setComputerMatchPreview(null)
    setCurrentMatchWinnerId(undefined)

    const initialDelay = 2000 + Math.random() * 1000
    let cancelled = false
    let finalTimeoutId = null

    const initialTimeoutId = setTimeout(() => {
      if (cancelled) return

      const available = computerPartyRef.current.filter(item => item.matchState === null)

      if (available.length === 0) {
        console.log('No available computer pokemon for first pick')
        return
      }

      const strategy = getComputerMatchPickFirstStrategy(gameDifficultyRef.current)
      let selectedPokemon

      if (strategy === COMPUTER_PICK_SELECT_BEST) {
        console.log('Computer first pick: used selectBestPokemon')
        const defendPokemonList = playerPartyRef.current
          .filter(item => item.matchState === null)
          .map(item => item.pokemon)
        const availableAttackPool = available.map(item => item.pokemon)
        const selectedId = selectBestPokemon(defendPokemonList, availableAttackPool)
        selectedPokemon = available.find(item => item.pokemon.id === selectedId)
          ?? available[Math.floor(Math.random() * available.length)]
      } else {
        console.log('Computer first pick: random')
        selectedPokemon = available[Math.floor(Math.random() * available.length)]
      }

      console.log('Computer selected first for match:', selectedPokemon.pokemon.name)

      setComputerMatchPreview({
        pokemon: selectedPokemon.pokemon
      })

      const finalDelay = Math.random() * 1000
      finalTimeoutId = setTimeout(() => {
        if (cancelled) return
        setSubstate(nextSubstate)
        console.log('Substate:', nextSubstate)
      }, finalDelay)
    }, initialDelay)

    return () => {
      cancelled = true
      clearTimeout(initialTimeoutId)
      if (finalTimeoutId) clearTimeout(finalTimeoutId)
    }
  }, [substate])

  // Resolve match → result display
  useEffect(() => {
    if (!isResolveSubstate(substate)) return

    const nextSubstate = RESOLVE_NEXT[substate]

    const timeoutId = setTimeout(() => {
      const playerPreview = playerMatchPreviewRef.current
      const computerPreview = computerMatchPreviewRef.current
      if (!playerPreview || !computerPreview) return

      const playerPokemon = playerPreview.pokemon
      const computerPokemon = computerPreview.pokemon
      const result = duelPokemons(playerPokemon, computerPokemon)

      console.log('Match result:', result)
      console.log('Player:', playerPokemon.name, 'Computer:', computerPokemon.name)
      console.log('Winner ID:', result)

      setCurrentMatchWinnerId(result)
      setMatchResults(prev => [...prev, result])

      if (result === playerPokemon.id) {
        setPlayerScore(prev => prev + 1)
        console.log('Player wins! Score +1')
      } else if (result === computerPokemon.id) {
        setComputerScore(prev => prev + 1)
        console.log('Computer wins! Score +1')
      } else {
        console.log('Tie! No score change')
      }

      setPlayerParty(currentParty => {
        return currentParty.map(item => {
          if (item.pokemon.id === playerPokemon.id) {
            let newMatchState = 'usedDraw'
            if (result === playerPokemon.id) {
              newMatchState = 'usedWon'
            } else if (result !== null && result !== playerPokemon.id) {
              newMatchState = 'usedLost'
            }
            return { ...item, matchState: newMatchState }
          }
          return item
        })
      })

      setComputerParty(currentParty => {
        return currentParty.map(item => {
          if (item.pokemon.id === computerPokemon.id) {
            let newMatchState = 'usedDraw'
            if (result === computerPokemon.id) {
              newMatchState = 'usedWon'
            } else if (result !== null && result !== computerPokemon.id) {
              newMatchState = 'usedLost'
            }
            return { ...item, matchState: newMatchState }
          }
          return item
        })
      })

      setSubstate(nextSubstate)
      console.log('Substate:', nextSubstate)
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [substate])

  // Result idle → next match, or state 4 after fifth match
  useEffect(() => {
    if (!isResultSubstate(substate)) return

    const nextSubstate = RESULT_NEXT[substate]

    const timeoutId = setTimeout(() => {
      if (nextSubstate === null) {
        setState(4)
        setSubstate(null)
        console.log('State: 4, Substate: null')
      } else {
        // Player-first matches: clear boards when entering their pick phase
        if (isPlayerTurn(nextSubstate)) {
          setPlayerMatchPreview(null)
          setComputerMatchPreview(null)
          setCurrentMatchWinnerId(undefined)
        }
        setSubstate(nextSubstate)
        console.log('Substate:', nextSubstate)
      }
    }, 3000)

    return () => clearTimeout(timeoutId)
  }, [substate])

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {showInstructions && (
        <GameInstructions onClose={() => setShowInstructions(false)} />
      )}
      {showTypeChart && (
        <TypeEffectivenessChart onClose={() => setShowTypeChart(false)} />
      )}

      {/* Nav Bar - 898 x 40 */}
      <div style={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '5px'
      }}>
        {/* Reset Button */}
        <button
          type="button"
          title="Reset game"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#CCCCCC',
            border: '1px solid #000000',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
          onClick={handleResetClick}
        >
          <Icon icon="pixel:refresh" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Instructions Button */}
        <button
          type="button"
          title="Instructions"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#CCCCCC',
            border: '1px solid #000000',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
          onClick={() => setShowInstructions(true)}
        >
          <Icon icon="pixel:question" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Type Effectiveness Chart Button */}
        <button
          type="button"
          title="Type effectiveness chart"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#CCCCCC',
            border: '1px solid #000000',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
          onClick={() => setShowTypeChart(true)}
        >
          <Icon icon="pixel:grid" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Nav Bar Display Text */}
        {navBarDisplay && (
          <div style={{
            fontSize: '14px',
            color: '#000000',
            fontFamily: 'monospace'
          }}>
            {navBarDisplay}
          </div>
        )}

        {/* Debug info */}
        <div style={{
          marginLeft: 'auto',
          fontSize: '12px',
          color: '#666666',
          fontFamily: 'monospace'
        }}>
          playerScore={playerScore} computerScore={computerScore} state={state} substate={substate}
        </div>
      </div>

      {/* Divider between nav bar and main game area */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#CCCCCC',
        flexShrink: 0
      }} />

      {/* Main Game Area - 898 x 560 */}
      <div style={{
        width: '100%',
        height: '560px',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}>
        {/* State 1: Game Mode Selection */}
        {state === 1 && (
          <div style={{
            position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Difficulty */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              marginBottom: '8px',
              color: '#000000'
            }}>
              Difficulty
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              width: '240px',
              marginBottom: '28px'
            }}>
              {[
                { value: DIFFICULTY_TRAINER, label: 'Trainer' },
                { value: DIFFICULTY_GYM_LEADER, label: 'Gym Leader' },
                { value: DIFFICULTY_CHAMPION, label: 'Champion' },
              ].map(({ value, label }) => {
                const selected = gameDifficulty === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setGameDifficulty(value)}
                    style={{
                      flex: 1,
                      height: '36px',
                      backgroundColor: selected ? '#999999' : '#CCCCCC',
                      border: selected ? '2px solid #000000' : '1px solid #000000',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      padding: '0 2px'
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              marginBottom: '8px',
              color: '#000000'
            }}>
              Game mode
            </div>

            {/* First game mode option */}
            <button
              style={{
                width: '240px',
                height: '40px',
                backgroundColor: '#CCCCCC',
                border: '1px solid #000000',
                borderRadius: '6px',
                cursor: substate === 1.2 ? 'not-allowed' : 'pointer',
                marginBottom: '20px',
                opacity: substate === 1.2 ? 0.45 : 1
              }}
              disabled={substate === 1.2}
              onClick={handleFirstOptionClick}
            >
              Classic
            </button>

            {/* Second game mode option */}
            <button
              style={{
                width: '240px',
                height: '40px',
                backgroundColor: '#CCCCCC',
                border: '1px solid #000000',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={handleSecondOptionClick}
            >
              Captain's Mode
            </button>

            {/* Smaller options that appear when substate = 1.2 */}
            {substate === 1.2 && (
              <div style={{
                display: 'flex',
                marginTop: '8px',
                gap: '8px',
                width: '240px'
              }}>
                {/* First smaller option */}
                <button
                  style={{
                    flex: 1,
                    height: '36px',
                    backgroundColor: '#DDDDDD',
                    border: '1px solid #000000',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onClick={handleSmallOption1Click}
                >
                  Pick First
                </button>

                {/* Second smaller option */}
                <button
                  style={{
                    flex: 1,
                    height: '36px',
                    backgroundColor: '#DDDDDD',
                    border: '1px solid #000000',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onClick={handleSmallOption2Click}
                >
                  Pick Last
                </button>
              </div>
            )}
          </div>
        )}

        {/* State 2: Pokemon Selection */}
        {state === 2 && (
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%'
          }}>
            {/* Left Area - Player Party */}
            <div style={{
              width: '134px',
              height: '558px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '32px',
                left: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const isOccupied = index < playerParty.length
                  const isClickable = substate === 2.1 && isOccupied
                  const pokemon = playerParty[index]?.pokemon
                  const isPreviewed = pokemonSelectionPreview?.pokemon?.id === pokemon?.id

                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          width: '66px',
                          height: '48px',
                          backgroundColor: '#EEEEEE',
                          border: '1px solid #000000',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          textAlign: 'center',
                          overflow: 'visible',
                          cursor: isClickable ? 'pointer' : 'default'
                        }}
                        onClick={() => isClickable && handlePlayerPartyRemove(index)}
                      >
                        {pokemon ? (
                          pokemon.spriteFileName ? (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'visible'
                            }}>
                              <SpriteAnimation
                                spriteFileName={pokemon.spriteFileName}
                                pokemonName={pokemon.name}
                                scale={isPreviewed ? 1.54 : 1.1}
                              />
                            </div>
                          ) : (
                            pokemon.name
                          )
                        ) : ''}
                      </div>

                      {/* Type chips - to the right of rectangle */}
                      {pokemon && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {pokemon.types.map((type, typeIndex) => (
                            <div
                              key={typeIndex}
                              style={{
                                height: '20px',
                                padding: '0 6px',
                                borderRadius: '10px',
                                backgroundColor: pokemonTypes[type].backgroundColor,
                                color: '#FFFFFF',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Center Area - Pokemon Pool */}
            <div style={{
              width: '630px',
              height: '558px',
              position: 'relative'
            }}>
              {/* Preview Square - 180 x 180 */}
              <div style={{
                position: 'absolute',
                bottom: '266px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {/* Preview image */}
                <div style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: pokemonSelectionPreview ? '#EEEEEE' : 'transparent',
                  border: pokemonSelectionPreview ? '2px solid #000000' : '2px solid transparent',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  overflow: 'visible'
                }}>
                  {pokemonSelectionPreview ? (
                    pokemonSelectionPreview.pokemon.spriteFileName ? (
                      <SpriteAnimation
                        spriteFileName={pokemonSelectionPreview.pokemon.spriteFileName}
                        pokemonName={pokemonSelectionPreview.pokemon.name}
                        scale={4.5}
                      />
                    ) : (
                      pokemonSelectionPreview.pokemon.name
                    )
                  ) : ''}
                </div>

                {/* Pokemon info - name and types */}
                {pokemonSelectionPreview && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    width: '120px'
                  }}>
                    {/* Pokemon name */}
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      textTransform: 'capitalize',
                      overflow: 'visible',
                      whiteSpace: 'nowrap'
                    }}>
                      {pokemonSelectionPreview.pokemon.name}
                    </div>

                    {/* Type chips */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxWidth: '100px'
                    }}>
                      {pokemonSelectionPreview.pokemon.types.map((type, typeIndex) => (
                        <div
                          key={typeIndex}
                          style={{
                            height: '20px',
                            padding: '0 8px',
                            borderRadius: '10px',
                            backgroundColor: pokemonTypes[type].backgroundColor,
                            color: '#FFFFFF',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            maxWidth: '100px',
                            boxSizing: 'border-box'
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Check and Cross buttons */}
              <div style={{
                position: 'absolute',
                bottom: '248px',
                left: 'calc(50% - 66px)',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 2
              }}>
                {pokemonSelectionPreview ? (
                  <>
                    {/* Check button */}
                    <button
                      style={{
                        width: '60px',
                        height: '32px',
                        backgroundColor: '#CCCCCC',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        cursor: (pokemonSelectionPreview.isFromParty || substate === 2.4 || isCaptainsComputerPick(substate)) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        opacity: (pokemonSelectionPreview.isFromParty || substate === 2.4 || isCaptainsComputerPick(substate)) ? 0.5 : 1
                      }}
                      onClick={handleCheckClick}
                      disabled={pokemonSelectionPreview.isFromParty || substate === 2.4 || isCaptainsComputerPick(substate)}
                    >
                      ✓
                    </button>

                    {/* Cross button */}
                    <button
                      style={{
                        width: '60px',
                        height: '32px',
                        backgroundColor: '#CCCCCC',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        cursor: (substate === 2.4 || isCaptainsComputerPick(substate)) ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        opacity: (substate === 2.4 || isCaptainsComputerPick(substate)) ? 0.5 : 1
                      }}
                      onClick={handleCrossClick}
                      disabled={substate === 2.4 || isCaptainsComputerPick(substate)}
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  // Transparent placeholder divs to preserve positioning
                  <>
                    <div style={{ width: '60px', height: '32px', backgroundColor: 'transparent' }} />
                    <div style={{ width: '60px', height: '32px', backgroundColor: 'transparent' }} />
                  </>
                )}
              </div>

              {/* Top row - 8 squares */}
              <div style={{
                position: 'absolute',
                bottom: `${24 + 44 + 16 + 44 + 16}px`, // 24 + bottom row + gap + middle row + gap
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '16px'
              }}>
                {pokemonPool.slice(0, 8).map((poolItem, index) => {
                  const isSelected = poolItem.selectionState !== null
                  const isClickable = (substate === 2.1 || isCaptainsPlayerPick(substate)) && playerParty.length < 6 && !isSelected

                  return (
                    <div
                      key={index}
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: isSelected ? '#999999' : '#DDDDDD',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        fontSize: '8px',
                        textAlign: 'center',
                        overflow: 'visible',
                        cursor: isClickable ? 'pointer' : 'default',
                        opacity: isSelected ? 0.5 : 1
                      }}
                      onClick={() => isClickable && handlePoolPokemonClick(index)}
                    >
                      {poolItem.pokemon.spriteFileNameStatic ? (
                        <img
                          src={poolItem.pokemon.spriteFileNameStatic.startsWith('public/')
                            ? '/' + poolItem.pokemon.spriteFileNameStatic.replace('public/', '')
                            : poolItem.pokemon.spriteFileNameStatic}
                          alt={poolItem.pokemon.name}
                          style={{
                            width: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            height: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            maxWidth: 'none'
                          }}
                        />
                      ) : poolItem.pokemon.spriteFileName ? (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'visible'
                        }}>
                          <SpriteAnimation
                            spriteFileName={poolItem.pokemon.spriteFileName}
                            pokemonName={poolItem.pokemon.name}
                            scale={1.2}
                          />
                        </div>
                      ) : (
                        poolItem.pokemon.name
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Middle row - 9 squares */}
              <div style={{
                position: 'absolute',
                bottom: `${24 + 44 + 16}px`, // 24 + bottom row + gap
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '16px'
              }}>
                {pokemonPool.slice(8, 17).map((poolItem, index) => {
                  const poolIndex = index + 8
                  const isSelected = poolItem.selectionState !== null
                  const isClickable = (substate === 2.1 || isCaptainsPlayerPick(substate)) && playerParty.length < 6 && !isSelected

                  return (
                    <div
                      key={poolIndex}
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: isSelected ? '#999999' : '#DDDDDD',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        fontSize: '8px',
                        textAlign: 'center',
                        overflow: 'visible',
                        cursor: isClickable ? 'pointer' : 'default',
                        opacity: isSelected ? 0.5 : 1
                      }}
                      onClick={() => isClickable && handlePoolPokemonClick(poolIndex)}
                    >
                      {poolItem.pokemon.spriteFileNameStatic ? (
                        <img
                          src={poolItem.pokemon.spriteFileNameStatic.startsWith('public/')
                            ? '/' + poolItem.pokemon.spriteFileNameStatic.replace('public/', '')
                            : poolItem.pokemon.spriteFileNameStatic}
                          alt={poolItem.pokemon.name}
                          style={{
                            width: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            height: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            maxWidth: 'none'
                          }}
                        />
                      ) : poolItem.pokemon.spriteFileName ? (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'visible'
                        }}>
                          <SpriteAnimation
                            spriteFileName={poolItem.pokemon.spriteFileName}
                            pokemonName={poolItem.pokemon.name}
                            scale={1.2}
                          />
                        </div>
                      ) : (
                        poolItem.pokemon.name
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom row - 6 squares */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '16px'
              }}>
                {pokemonPool.slice(17, 23).map((poolItem, index) => {
                  const poolIndex = index + 17
                  const isSelected = poolItem.selectionState !== null
                  const isClickable = (substate === 2.1 || isCaptainsPlayerPick(substate)) && playerParty.length < 6 && !isSelected

                  return (
                    <div
                      key={poolIndex}
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: isSelected ? '#999999' : '#DDDDDD',
                        border: '1px solid #000000',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        fontSize: '8px',
                        textAlign: 'center',
                        overflow: 'visible',
                        cursor: isClickable ? 'pointer' : 'default',
                        opacity: isSelected ? 0.5 : 1
                      }}
                      onClick={() => isClickable && handlePoolPokemonClick(poolIndex)}
                    >
                      {poolItem.pokemon.spriteFileNameStatic ? (
                        <img
                          src={poolItem.pokemon.spriteFileNameStatic.startsWith('public/')
                            ? '/' + poolItem.pokemon.spriteFileNameStatic.replace('public/', '')
                            : poolItem.pokemon.spriteFileNameStatic}
                          alt={poolItem.pokemon.name}
                          style={{
                            width: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            height: pokemonSelectionPreview?.pokemon?.id === poolItem.pokemon.id ? '200%' : '150%',
                            maxWidth: 'none'
                          }}
                        />
                      ) : poolItem.pokemon.spriteFileName ? (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'visible'
                        }}>
                          <SpriteAnimation
                            spriteFileName={poolItem.pokemon.spriteFileName}
                            pokemonName={poolItem.pokemon.name}
                            scale={1.25}
                          />
                        </div>
                      ) : (
                        poolItem.pokemon.name
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Area - Computer Party */}
            <div style={{
              width: '134px',
              height: '558px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '32px',
                right: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const pokemon = computerParty[index]?.pokemon

                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexDirection: 'row-reverse'
                      }}
                    >
                      <div
                        style={{
                          width: '66px',
                          height: '48px',
                          backgroundColor: '#EEEEEE',
                          border: '1px solid #000000',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          textAlign: 'center',
                          overflow: 'visible'
                        }}
                      >
                        {pokemon ? (
                          pokemon.spriteFileName ? (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'visible'
                            }}>
                              <SpriteAnimation
                                spriteFileName={pokemon.spriteFileName}
                                pokemonName={pokemon.name}
                                scale={1.1}
                              />
                            </div>
                          ) : (
                            pokemon.name
                          )
                        ) : ''}
                      </div>

                      {/* Type chips - to the left of rectangle */}
                      {pokemon && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {pokemon.types.map((type, typeIndex) => (
                            <div
                              key={typeIndex}
                              style={{
                                height: '20px',
                                padding: '0 6px',
                                borderRadius: '10px',
                                backgroundColor: pokemonTypes[type].backgroundColor,
                                color: '#FFFFFF',
                                fontSize: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* State 3: Match Selection */}
        {state === 3 && (
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%'
          }}>
            {/* Left Area - Player Party */}
            <div style={{
              width: '154px',
              height: '558px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '32px',
                left: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const pokemon = playerParty[index]?.pokemon
                    const matchState = playerParty[index]?.matchState
                    const isUsed = matchState !== null && matchState !== undefined
                    const isClickable = isPlayerTurn(substate) && !isUsed
                    const isPreviewed = playerMatchPreview?.pokemon?.id === pokemon?.id

                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: isUsed ? 0.4 : 1
                        }}
                      >
                        <div
                          style={{
                            width: '66px',
                            height: '48px',
                            backgroundColor: '#EEEEEE',
                            border: '1px solid #000000',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            textAlign: 'center',
                            overflow: 'visible',
                            cursor: isClickable ? 'pointer' : 'default'
                          }}
                          onClick={() => isClickable && handlePlayerPartyMatchClick(index)}
                        >
                          {pokemon ? (
                            pokemon.spriteFileName ? (
                              <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'visible'
                              }}>
                                <SpriteAnimation
                                  spriteFileName={pokemon.spriteFileName}
                                  pokemonName={pokemon.name}
                                  scale={isPreviewed ? 1.54 : 1.1}
                                />
                              </div>
                            ) : (
                              pokemon.name
                            )
                          ) : ''}
                        </div>

                        {/* Type chips - to the right of rectangle */}
                        {pokemon && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {pokemon.types.map((type, typeIndex) => (
                              <div
                                key={typeIndex}
                                style={{
                                  height: '20px',
                                  padding: '0 6px',
                                  borderRadius: '10px',
                                  backgroundColor: pokemonTypes[type].backgroundColor,
                                  color: '#FFFFFF',
                                  fontSize: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {type}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Player turn loading indicator */}
                {isPlayerTurn(substate) && (
                  <div style={{ marginTop: '12px' }}>
                    <PixelLoading />
                  </div>
                )}
              </div>
            </div>

            {/* Center Area - Two Preview Squares */}
            <div style={{
              width: '590px',
              height: '558px',
              backgroundColor: '#FFFFFF',
              position: 'relative'
            }}>
              {/* Player Match Preview Square - Lower Left */}
              {(() => {
                const showResult = isResultSubstate(substate) && currentMatchWinnerId !== undefined
                const playerResultLabel = !showResult
                  ? null
                  : currentMatchWinnerId === null
                    ? 'DRAW'
                    : currentMatchWinnerId === playerMatchPreview?.pokemon?.id
                      ? 'WIN'
                      : 'LOSE'
                const playerResultColor =
                  playerResultLabel === 'WIN' ? '#22AA22'
                    : playerResultLabel === 'LOSE' ? '#CC2222'
                      : playerResultLabel === 'DRAW' ? '#666666'
                        : '#000000'

                return (
              <div style={{
                position: 'absolute',
                bottom: '72px',
                left: '72px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Result label */}
                {playerResultLabel && (
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: playerResultColor,
                    imageRendering: 'pixelated',
                    marginBottom: '8px',
                    letterSpacing: '2px'
                  }}>
                    {playerResultLabel}
                  </div>
                )}

                {/* Preview Square */}
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#EEEEEE',
                    border: `3px solid ${playerResultLabel ? playerResultColor : '#000000'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    textAlign: 'center',
                    overflow: 'visible',
                    position: 'relative',
                    opacity: playerResultLabel === 'LOSE' ? 0.45 : 1
                  }}
                >
                  {playerMatchPreview && (
                    playerMatchPreview.pokemon.spriteFileName ? (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'visible'
                      }}>
                        <SpriteAnimation
                          spriteFileName={playerMatchPreview.pokemon.spriteFileName}
                          pokemonName={playerMatchPreview.pokemon.name}
                          scale={4.5}
                        />
                      </div>
                    ) : (
                      playerMatchPreview.pokemon.name
                    )
                  )}
                </div>

                {/* Check Button - only on player pick turns */}
                {playerMatchPreview && isPlayerTurn(substate) && (
                  <button
                    style={{
                      width: '60px',
                      height: '32px',
                      backgroundColor: '#CCCCCC',
                      border: '1px solid #000000',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '-16px',
                      position: 'relative',
                      zIndex: 2
                    }}
                    onClick={handlePlayerMatchCheckClick}
                  >
                    ✓
                  </button>
                )}

                {/* Pokemon Info - Name and Types */}
                {playerMatchPreview && (
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    {/* Pokemon name */}
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      textTransform: 'capitalize'
                    }}>
                      {playerMatchPreview.pokemon.name}
                    </div>
                    {/* Type chips */}
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {playerMatchPreview.pokemon.types.map((type, typeIndex) => (
                        <div
                          key={typeIndex}
                          style={{
                            height: '20px',
                            padding: '0 6px',
                            borderRadius: '10px',
                            backgroundColor: pokemonTypes[type].backgroundColor,
                            color: '#FFFFFF',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
                )
              })()}

              {/* Computer Match Preview Square - Upper Right */}
              {(() => {
                const showResult = isResultSubstate(substate) && currentMatchWinnerId !== undefined
                const computerResultLabel = !showResult
                  ? null
                  : currentMatchWinnerId === null
                    ? 'DRAW'
                    : currentMatchWinnerId === computerMatchPreview?.pokemon?.id
                      ? 'WIN'
                      : 'LOSE'
                const computerResultColor =
                  computerResultLabel === 'WIN' ? '#22AA22'
                    : computerResultLabel === 'LOSE' ? '#CC2222'
                      : computerResultLabel === 'DRAW' ? '#666666'
                        : '#000000'

                return (
              <div style={{
                position: 'absolute',
                top: '72px',
                right: '72px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Result label */}
                {computerResultLabel && (
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: computerResultColor,
                    imageRendering: 'pixelated',
                    marginBottom: '8px',
                    letterSpacing: '2px'
                  }}>
                    {computerResultLabel}
                  </div>
                )}

                {/* Preview Square */}
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#EEEEEE',
                    border: `3px solid ${computerResultLabel ? computerResultColor : '#000000'}`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    textAlign: 'center',
                    overflow: 'visible',
                    position: 'relative',
                    opacity: computerResultLabel === 'LOSE' ? 0.45 : 1
                  }}
                >
                  {computerMatchPreview && (
                    computerMatchPreview.pokemon.spriteFileName ? (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'visible'
                      }}>
                        <SpriteAnimation
                          spriteFileName={computerMatchPreview.pokemon.spriteFileName}
                          pokemonName={computerMatchPreview.pokemon.name}
                          scale={4.5}
                        />
                      </div>
                    ) : (
                      computerMatchPreview.pokemon.name
                    )
                  )}
                </div>

                {/* Pokemon Info - Name and Types */}
                {computerMatchPreview && (
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    {/* Pokemon name */}
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      textTransform: 'capitalize'
                    }}>
                      {computerMatchPreview.pokemon.name}
                    </div>
                    {/* Type chips */}
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {computerMatchPreview.pokemon.types.map((type, typeIndex) => (
                        <div
                          key={typeIndex}
                          style={{
                            height: '20px',
                            padding: '0 6px',
                            borderRadius: '10px',
                            backgroundColor: pokemonTypes[type].backgroundColor,
                            color: '#FFFFFF',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
                )
              })()}
            </div>

            {/* Right Area - Computer Party */}
            <div style={{
              width: '154px',
              height: '558px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '32px',
                right: '28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const pokemon = computerParty[index]?.pokemon
                    const matchState = computerParty[index]?.matchState
                    const isUsed = matchState !== null && matchState !== undefined
                    const isPreviewed = computerMatchPreview?.pokemon?.id === pokemon?.id

                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          flexDirection: 'row-reverse',
                          opacity: isUsed ? 0.4 : 1
                        }}
                      >
                        <div
                          style={{
                            width: '66px',
                            height: '48px',
                            backgroundColor: '#EEEEEE',
                            border: '1px solid #000000',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '8px',
                            textAlign: 'center',
                            overflow: 'visible'
                          }}
                        >
                          {pokemon ? (
                            pokemon.spriteFileName ? (
                              <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'visible'
                              }}>
                                <SpriteAnimation
                                  spriteFileName={pokemon.spriteFileName}
                                  pokemonName={pokemon.name}
                                  scale={isPreviewed ? 1.54 : 1.1}
                                />
                              </div>
                            ) : (
                              pokemon.name
                            )
                          ) : ''}
                        </div>

                        {/* Type chips - to the left of rectangle */}
                        {pokemon && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {pokemon.types.map((type, typeIndex) => (
                              <div
                                key={typeIndex}
                                style={{
                                  height: '20px',
                                  padding: '0 6px',
                                  borderRadius: '10px',
                                  backgroundColor: pokemonTypes[type].backgroundColor,
                                  color: '#FFFFFF',
                                  fontSize: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 'bold',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {type}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Computer turn loading indicator */}
                {isComputerTurn(substate) && (
                  <div style={{ marginTop: '12px' }}>
                    <PixelLoading />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* State 4: Final score screen */}
        {state === 4 && (() => {
          const isTie = playerScore === computerScore
          const winningParty = playerScore > computerScore ? playerParty : computerParty
          const topThree = !isTie ? winningParty.slice(0, 3) : []
          const bottomThree = !isTie ? winningParty.slice(3, 6) : []

          const renderPartyRow = (partySlice, keyPrefix) => (
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {partySlice.map((item, index) => {
                const pokemon = item.pokemon
                return (
                  <div
                    key={`${keyPrefix}-${index}`}
                    style={{
                      width: '110px',
                      height: '80px',
                      backgroundColor: '#EEEEEE',
                      border: '1px solid #000000',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'visible'
                    }}
                  >
                    {pokemon.spriteFileName ? (
                      <SpriteAnimation
                        spriteFileName={pokemon.spriteFileName}
                        pokemonName={pokemon.name}
                        scale={1.9}
                      />
                    ) : (
                      <span style={{ fontSize: '12px', textAlign: 'center', fontFamily: 'monospace' }}>
                        {pokemon.name}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )

          return (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '180px 0 110px',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
              fontSize: '14px'
            }}>
              {/* Top three pokemon */}
              <div style={{ minHeight: '80px' }}>
                {!isTie && renderPartyRow(topThree, 'top')}
              </div>

              {/* Score text */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                textAlign: 'center'
              }}>
                <div>Final Score</div>
                <div>Player {playerScore} — {computerScore} Computer</div>
                <div>
                  {playerScore > computerScore
                    ? 'Player wins!'
                    : computerScore > playerScore
                      ? 'Computer wins!'
                      : "It's a tie!"}
                </div>
              </div>

              {/* Bottom three pokemon */}
              <div style={{ minHeight: '80px' }}>
                {!isTie && renderPartyRow(bottomThree, 'bottom')}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default PokemonParty
