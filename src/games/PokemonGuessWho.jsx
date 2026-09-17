import { useState } from 'react'
import { Icon } from '@iconify/react'
import { pokemonCharacterList } from '../data/game-files/pokemonGuessWho'
import { pokemonTypes } from '../data/types'
import GuessWhoGridInfo from '../components/GuessWhoGridInfo'
import GuessWhoInstructions from '../components/GuessWhoInstructions'

const GRID_COLS = 7
const GRID_ROWS = 6
const GAME_FONT = "'Futura LT Pro', 'Futura', sans-serif"

function getStaticSpriteSrc(spriteFileNameStatic) {
  if (!spriteFileNameStatic) return null
  if (spriteFileNameStatic.startsWith('public/')) {
    return '/' + spriteFileNameStatic.replace('public/', '')
  }
  return spriteFileNameStatic
}

const FILTER_TYPE_LIST = Object.keys(pokemonTypes)

function TypeChip({ type, fontWeight = 700 }) {
  return (
    <div
      style={{
        height: '12px',
        padding: '0 4px',
        borderRadius: '6px',
        backgroundColor: pokemonTypes[type].backgroundColor,
        color: '#FFFFFF',
        fontSize: '7px',
        fontFamily: GAME_FONT,
        fontWeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'lowercase',
        boxSizing: 'border-box',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        width: 'fit-content',
      }}
    >
      {type}
    </div>
  )
}

function FilterOptionsPanel({ selectedFilter }) {
  if (selectedFilter == null) return null

  const lineStyle = {
    fontFamily: GAME_FONT,
    fontWeight: 300,
    fontSize: '10px',
    color: '#000000',
    lineHeight: 0.9,
    margin: 0,
  }

  if (selectedFilter === 4) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={lineStyle}>S - Starter</p>
        <p style={lineStyle}>L - Legendary</p>
      </div>
    )
  }

  if (selectedFilter === 3) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={lineStyle}>I - Generation I</p>
        <p style={lineStyle}>II - Generation II</p>
        <p style={lineStyle}>III - Generation III</p>
        <p style={lineStyle}>IV - Generation IV</p>
      </div>
    )
  }

  if (selectedFilter === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={lineStyle}>B - Base evolution</p>
        <p style={lineStyle}>F - Final evolution</p>
        <p style={lineStyle}>S - Single evolution (does not evolve)</p>
      </div>
    )
  }

  if (selectedFilter === 1) {
    const columns = []
    for (let i = 0; i < FILTER_TYPE_LIST.length; i += 3) {
      columns.push(FILTER_TYPE_LIST.slice(i, i + 3))
    }

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '14px',
        boxSizing: 'border-box',
      }}>
        {columns.map((columnTypes, colIndex) => (
          <div
            key={colIndex}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {columnTypes.map((type) => (
              <TypeChip key={type} type={type} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return null
}

function getGridBadgeLetter(pokemon, selectedFilter) {
  if (selectedFilter === 2) {
    if (pokemon.evolution.value === 'base') return 'B'
    if (pokemon.evolution.value === 'final') return 'F'
    if (pokemon.evolution.value === 'single') return 'S'
    return null
  }
  if (selectedFilter === 3) {
    return pokemon.generation.value || null
  }
  if (selectedFilter === 4) {
    if (pokemon.isLegendary) return 'L'
    if (pokemon.isStarter) return 'S'
    return null
  }
  return null
}

const EVOLUTION_BADGE_COLORS = {
  B: { backgroundColor: '#7EB6DE', color: '#F4FAFF' }, // light blue
  F: { backgroundColor: '#2F6FB5', color: '#F4FAFF' }, // mid blue
  S: { backgroundColor: '#163A66', color: '#F4FAFF' }, // dark blue
}

const GENERATION_BADGE_COLORS = {
  I: { backgroundColor: '#E86A2E', color: '#FFF5F2' }, // red-orange
  II: { backgroundColor: '#C62828', color: '#FFF5F2' }, // red
  III: { backgroundColor: '#9B2D5C', color: '#FFF5F2' }, // red-purple
  IV: { backgroundColor: '#6B2D8B', color: '#FFF5F2' }, // purple
}

function getLetterBadgeColors(selectedFilter, letter) {
  if (selectedFilter === 2) {
    return EVOLUTION_BADGE_COLORS[letter] || { backgroundColor: '#CCCCCC', color: '#000000' }
  }
  if (selectedFilter === 3) {
    return GENERATION_BADGE_COLORS[letter] || { backgroundColor: '#CCCCCC', color: '#000000' }
  }
  if (selectedFilter === 4) {
    if (letter === 'L') return { backgroundColor: '#202C37', color: '#FFFFFF' }
    if (letter === 'S') return { backgroundColor: '#4d4857', color: '#FFFFFF' }
  }
  return { backgroundColor: '#CCCCCC', color: '#000000' }
}

function GridFilterBadge({ pokemon, selectedFilter }) {
  if (selectedFilter == null) return null

  if (selectedFilter === 1) {
    return (
      <div style={{
        position: 'absolute',
        right: '-4px',
        bottom: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        zIndex: 3,
      }}>
        {pokemon.types.map((type) => (
          <div
            key={type}
            style={{
              height: '14px',
              padding: '0 3px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: pokemonTypes[type].backgroundColor,
              color: '#FFFFFF',
              fontSize: '8px',
              fontFamily: GAME_FONT,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'lowercase',
              boxSizing: 'border-box',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              width: 'fit-content',
              lineHeight: 1,
            }}
          >
            {type.slice(0, 3)}
          </div>
        ))}
      </div>
    )
  }

  const letter = getGridBadgeLetter(pokemon, selectedFilter)
  if (!letter) return null

  const { backgroundColor, color } = getLetterBadgeColors(selectedFilter, letter)

  return (
    <div style={{
      position: 'absolute',
      right: '-4px',
      bottom: '2px',
      width: '15px',
      height: '15px',
      borderRadius: '5px',
      backgroundColor,
      border: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 3,
      fontFamily: GAME_FONT,
      fontWeight: 500,
      fontSize: letter.length > 1 ? '8px' : '10px',
      color,
      lineHeight: 1,
    }}>
      {letter}
    </div>
  )
}

function CharacterDetailContent({ pokemonCharacter, fontWeight = 300 }) {
  if (!pokemonCharacter) return null

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        minWidth: 0,
      }}>
        <span style={{
          fontSize: '12px',
          color: '#000000',
          fontFamily: GAME_FONT,
          fontWeight,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          {pokemonCharacter.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
          {pokemonCharacter.types.map((type) => (
            <TypeChip key={type} type={type} fontWeight={fontWeight} />
          ))}
        </div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        minWidth: 0,
      }}>
        <div style={{ width: '50%', minWidth: 0, boxSizing: 'border-box' }}>
          <div style={{
            fontSize: '10px',
            color: '#000000',
            opacity: 0.8,
            fontFamily: GAME_FONT,
            fontWeight,
            paddingTop: '6px',
            lineHeight: 1,
          }}>
            {pokemonCharacter.typing.label}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#000000',
            opacity: 0.8,
            fontFamily: GAME_FONT,
            fontWeight,
            paddingTop: '4px',
            lineHeight: 1,
          }}>
            Evolution Stage: {pokemonCharacter.evolution.label}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#000000',
            opacity: 0.8,
            fontFamily: GAME_FONT,
            fontWeight,
            paddingTop: '4px',
            lineHeight: 1,
          }}>
            Generation: {pokemonCharacter.generation.label}
          </div>
        </div>
        <div style={{ width: '50%', minWidth: 0, boxSizing: 'border-box' }}>
          {(pokemonCharacter.isLegendary || pokemonCharacter.isStarter) && (
            <div style={{
              paddingTop: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
            }}>
              {pokemonCharacter.isLegendary && (
                <div
                  style={{
                    height: '12px',
                    padding: '0 4px',
                    borderRadius: '6px',
                    backgroundColor: '#202C37',
                    color: '#FFFFFF',
                    fontSize: '7px',
                    fontFamily: GAME_FONT,
                    fontWeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    width: 'fit-content',
                  }}
                >
                  Legendary
                </div>
              )}
              {pokemonCharacter.isStarter && (
                <div
                  style={{
                    height: '12px',
                    padding: '0 4px',
                    borderRadius: '6px',
                    backgroundColor: '#4d4857',
                    color: '#FFFFFF',
                    fontSize: '7px',
                    fontFamily: GAME_FONT,
                    fontWeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    width: 'fit-content',
                  }}
                >
                  Starter
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function CharacterPreview({ pokemonCharacter, previewSquareStyle }) {
  const spriteSrc = getStaticSpriteSrc(pokemonCharacter?.spriteFileNameStatic)
  return (
    <div style={{
      ...previewSquareStyle,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: spriteSrc ? 'transparent' : previewSquareStyle.backgroundColor,
    }}>
      {spriteSrc && (
        <img
          src={spriteSrc}
          alt={pokemonCharacter.name}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            borderRadius: '5px',
            display: 'block',
            imageRendering: 'pixelated',
          }}
        />
      )}
    </div>
  )
}

function PokemonGuessWho() {
  const [state, setState] = useState(1)
  const [substate, setSubstate] = useState(0.0)
  /** @type {[import('../data/PokemonCharacter').default | null, function]} */
  const [state1selectingPokemonCharacter, setState1selectingPokemonCharacter] = useState(null)
  /** @type {[import('../data/PokemonCharacter').default | null, function]} */
  const [state2guessingPokemonCharacter, setState2guessingPokemonCharacter] = useState(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showGridInfo, setShowGridInfo] = useState(false)
  /** @type {[1 | 2 | 3 | 4 | null, function]} */
  const [selectedFilter, setSelectedFilter] = useState(null)
  /** @type {[Set<number>, function]} */
  const [greyedOutPokemonIds, setGreyedOutPokemonIds] = useState(() => new Set())

  const handleCharacterGridClick = (pokemon) => {
    if (state === 1) {
      setState1selectingPokemonCharacter(pokemon)
    } else if (state === 2) {
      setState2guessingPokemonCharacter(pokemon)
    }
  }

  const handleConfirmSelection = () => {
    if (state !== 1 || !state1selectingPokemonCharacter) return
    setState(2)
    setState2guessingPokemonCharacter(null)
    setSelectedFilter(null)
    setGreyedOutPokemonIds(new Set())
  }

  const handleReset = () => {
    setState(1)
    setState1selectingPokemonCharacter(null)
    setState2guessingPokemonCharacter(null)
    setSelectedFilter(null)
    setGreyedOutPokemonIds(new Set())
  }

  const handleFlipUp = () => {
    if (!state2guessingPokemonCharacter) return
    const id = state2guessingPokemonCharacter.id
    if (!greyedOutPokemonIds.has(id)) return
    setGreyedOutPokemonIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setState2guessingPokemonCharacter(null)
  }

  const handleFlipDown = () => {
    if (!state2guessingPokemonCharacter) return
    const id = state2guessingPokemonCharacter.id
    if (greyedOutPokemonIds.has(id)) return
    setGreyedOutPokemonIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setState2guessingPokemonCharacter(null)
  }

  const handleFilterToggle = (filterId) => {
    setSelectedFilter((current) => (current === filterId ? null : filterId))
  }

  const filterOptions = [
    { id: 1, label: 'Typings' },
    { id: 2, label: 'Evolution' },
    { id: 3, label: 'Generation' },
    { id: 4, label: 'Starter/Legendary' },
  ]

  const navButtonStyle = {
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
    padding: 0,
  }

  const previewSquareStyle = {
    width: '60px',
    height: '60px',
    margin: '10px',
    backgroundColor: '#CCCCCC',
    borderRadius: '5px',
    flexShrink: 0,
    boxSizing: 'border-box',
  }

  const detailAreaStyle = {
    height: '60px',
    marginTop: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    marginLeft: 0,
    flex: 1,
    minWidth: 0,
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    border: 'none',
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
  }

  const emptyGridSquareStyle = {
    width: '39px',
    height: '39px',
    borderRadius: '5px',
    border: '1px solid #999999',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
  }

  const spriteGridSquareStyle = {
    width: '39px',
    height: '39px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const showSelectedDetail = state === 1
    ? state1selectingPokemonCharacter
    : state === 2 && state1selectingPokemonCharacter

  const showCheckingDetail = state === 2 && state2guessingPokemonCharacter

  const highlightedGridId = state === 1
    ? state1selectingPokemonCharacter?.id
    : state === 2
      ? state2guessingPokemonCharacter?.id
      : null

  const checkingIsGreyedOut = state === 2
    && state2guessingPokemonCharacter
    && greyedOutPokemonIds.has(state2guessingPokemonCharacter.id)
  const flipUpEnabled = Boolean(checkingIsGreyedOut)
  const flipDownEnabled = Boolean(state === 2 && state2guessingPokemonCharacter && !checkingIsGreyedOut)

  const flipButtonStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: '#CCCCCC',
    border: '1px solid #000000',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: GAME_FONT,
      fontWeight: 300,
    }}>
      {showInstructions && (
        <GuessWhoInstructions onClose={() => setShowInstructions(false)} />
      )}
      {showGridInfo && (
        <GuessWhoGridInfo onClose={() => setShowGridInfo(false)} />
      )}

      {/* Nav Bar - full width x 40 */}
      <div style={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {/* Reset Button */}
        <button
          type="button"
          title="Reset game"
          style={navButtonStyle}
          onClick={handleReset}
        >
          <Icon icon="pixel:refresh" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Instructions Button — no action yet */}
        <button
          type="button"
          title="Instructions"
          style={navButtonStyle}
          onClick={() => setShowInstructions(true)}
        >
          <Icon icon="pixel:question" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Grid Button */}
        <button
          type="button"
          title="Grid"
          style={{
            ...navButtonStyle,
            marginRight: '12px',
          }}
          onClick={() => setShowGridInfo(true)}
        >
          <Icon icon="pixel:grid" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        {/* Nav prompt */}
        <div style={{
          fontSize: '12px',
          color: '#000000',
          fontFamily: GAME_FONT,
          fontWeight: 500,
          lineHeight: 0.9,
        }}>
          {state === 1 && 'Game start. Select your character.'}
          {state === 2 && "Ask questions to guess out your opponent's character!"}
        </div>
      </div>

      {/* Divider between nav bar and main game area */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#CCCCCC',
        flexShrink: 0,
      }} />

      {/* Main Game Area — 539px (580 − 40 − 1) */}
      <div style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top div — 80px: selected character preview + detail area */}
        <div style={{
          width: '100%',
          height: '80px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}>
          <CharacterPreview
            pokemonCharacter={showSelectedDetail ? state1selectingPokemonCharacter : null}
            previewSquareStyle={previewSquareStyle}
          />
          {/* selected character detail area */}
          <div style={detailAreaStyle}>
            {showSelectedDetail && (
              <CharacterDetailContent
                pokemonCharacter={state1selectingPokemonCharacter}
                fontWeight={500}
              />
            )}
            {state === 1 && state1selectingPokemonCharacter && (
              <button
                type="button"
                title="Confirm selection"
                onClick={handleConfirmSelection}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#CCCCCC',
                  border: '1px solid #000000',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                <Icon icon="pixel:check" width={16} height={16} style={{ color: '#000000' }} />
              </button>
            )}
          </div>
        </div>

        {/* Divider between selected area and center */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#CCCCCC',
          flexShrink: 0,
        }} />

        {/* Center div — 377px: grid area + filter area */}
        <div style={{
          width: '100%',
          height: '377px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}>
          {/* Grid area — 300px: character grid */}
          <div style={{
            width: '100%',
            height: '300px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            overflow: 'visible',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_COLS}, 39px)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 39px)`,
              gap: '6px',
              overflow: 'visible',
            }}>
              {pokemonCharacterList.map((pokemon) => {
                const spriteSrc = getStaticSpriteSrc(pokemon.spriteFileNameStatic)
                const clickable = state === 1 || state === 2
                const isHighlighted = highlightedGridId === pokemon.id
                const isGreyedOut = state === 2 && greyedOutPokemonIds.has(pokemon.id)
                const showBadge = state === 2 && selectedFilter != null && !isGreyedOut
                const size = isHighlighted ? 43 : 39
                const highlightOffsetStyle = isHighlighted
                  ? {
                      width: '43px',
                      height: '43px',
                      marginLeft: '-2px',
                      marginTop: '-2px',
                      zIndex: 2,
                    }
                  : {}

                if (spriteSrc) {
                  return (
                    <div
                      key={pokemon.id}
                      role={clickable ? 'button' : undefined}
                      onClick={() => handleCharacterGridClick(pokemon)}
                      style={{
                        ...spriteGridSquareStyle,
                        ...highlightOffsetStyle,
                        position: 'relative',
                        cursor: clickable ? 'pointer' : 'default',
                        opacity: isGreyedOut ? 0.2 : 1,
                      }}
                    >
                      <img
                        src={spriteSrc}
                        alt={pokemon.name}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          objectFit: 'contain',
                          borderRadius: '5px',
                          display: 'block',
                          imageRendering: 'pixelated',
                        }}
                      />
                      {showBadge && (
                        <GridFilterBadge pokemon={pokemon} selectedFilter={selectedFilter} />
                      )}
                    </div>
                  )
                }
                return (
                  <div
                    key={pokemon.id}
                    role={clickable ? 'button' : undefined}
                    onClick={() => handleCharacterGridClick(pokemon)}
                    style={{
                      ...emptyGridSquareStyle,
                      ...highlightOffsetStyle,
                      position: 'relative',
                      cursor: clickable ? 'pointer' : 'default',
                      opacity: isGreyedOut ? 0.2 : 1,
                    }}
                  >
                    {showBadge && (
                      <GridFilterBadge pokemon={pokemon} selectedFilter={selectedFilter} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Filter area — 77px */}
          <div style={{
            width: '100%',
            height: '77px',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}>
            {state === 2 && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                padding: '4px 10px',
              }}>
                {/* Filter checkboxes row */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  gap: '14px',
                  flexShrink: 0,
                  padding: '0 0 6px 0'
                }}>
                  {filterOptions.map((option) => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontFamily: GAME_FONT,
                        fontWeight: 300,
                        fontSize: '10px',
                        color: '#000000',
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilter === option.id}
                        onChange={() => handleFilterToggle(option.id)}
                        style={{
                          margin: 0,
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>

                {/* Filter options area */}
                <div style={{
                  flex: 1,
                  minHeight: 0,
                  boxSizing: 'border-box',
                  paddingTop: '4px',
                  overflow: 'hidden',
                }}>
                  <FilterOptionsPanel selectedFilter={selectedFilter} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider between center and checking area */}
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#CCCCCC',
          flexShrink: 0,
        }} />

        {/* Bottom div — 80px: checking character preview + detail area */}
        <div style={{
          width: '100%',
          height: '80px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}>
          <CharacterPreview
            pokemonCharacter={showCheckingDetail ? state2guessingPokemonCharacter : null}
            previewSquareStyle={{
              ...previewSquareStyle,
              ...(state === 1 ? { backgroundColor: '#FFFFFF' } : {}),
            }}
          />
          {/* checking character detail area */}
          <div style={detailAreaStyle}>
            {showCheckingDetail && (
              <CharacterDetailContent
                pokemonCharacter={state2guessingPokemonCharacter}
                fontWeight={300}
              />
            )}
            {state === 2 && state2guessingPokemonCharacter && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                gap: '10px',
              }}>
                <button
                  type="button"
                  title="Flip up"
                  onClick={flipUpEnabled ? handleFlipUp : undefined}
                  disabled={!flipUpEnabled}
                  style={{
                    ...flipButtonStyle,
                    cursor: flipUpEnabled ? 'pointer' : 'default',
                    opacity: flipUpEnabled ? 1 : 0.2,
                  }}
                >
                  <Icon
                    icon="pixel:arrow-up"
                    width={16}
                    height={16}
                    style={{ color: '#000000' }}
                  />
                </button>
                <button
                  type="button"
                  title="Flip down"
                  onClick={flipDownEnabled ? handleFlipDown : undefined}
                  disabled={!flipDownEnabled}
                  style={{
                    ...flipButtonStyle,
                    cursor: flipDownEnabled ? 'pointer' : 'default',
                    opacity: flipDownEnabled ? 1 : 0.2,
                  }}
                >
                  <Icon
                    icon="pixel:arrow-down"
                    width={16}
                    height={16}
                    style={{ color: '#000000' }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonGuessWho
