import { useState } from 'react'
import { Icon } from '@iconify/react'
import { TYPE_ORDER, pokemonTypes } from '../data/types'

const CELL = 22
const CHIP_H = 12
const GAP = 1
const ATTACK_LABEL_W = 14
const Y_CHIP_COL = 22

function typeAbbrev(type) {
  return type.slice(0, 3)
}

function getCellValue(attackType, defendType) {
  const data = pokemonTypes[attackType]
  if (data.noDamage.includes(defendType)) return '0'
  if (data.strongAgainst.includes(defendType)) return '2'
  if (data.weakAgainst.includes(defendType)) return '1/2'
  return null
}

function TypeChip({ type, highlighted }) {
  return (
    <div
      style={{
        width: `${CELL}px`,
        height: `${CHIP_H}px`,
        borderRadius: '6px',
        backgroundColor: pokemonTypes[type].backgroundColor,
        color: '#FFFFFF',
        fontSize: '7px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'lowercase',
        boxSizing: 'border-box',
        outline: highlighted ? '2px solid #000000' : 'none',
        outlineOffset: '1px',
        transform: highlighted ? 'scale(1.25)' : 'scale(1)',
        zIndex: highlighted ? 2 : 1,
        boxShadow: highlighted ? '0 0 0 1px #FFFFFF' : 'none',
      }}
    >
      {typeAbbrev(type)}
    </div>
  )
}

function TypeEffectivenessChart({ onClose }) {
  const [hovered, setHovered] = useState(null) // { attack, defend } | null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="Type effectiveness chart"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#FFFFFF',
          border: '1px solid #000000',
          borderRadius: '6px',
          padding: '28px 16px 16px',
          boxSizing: 'border-box',
          maxWidth: 'calc(100% - 48px)',
          maxHeight: 'calc(100% - 48px)',
          overflow: 'auto',
        }}
      >
      <button
        type="button"
        title="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '28px',
          height: '28px',
          backgroundColor: '#CCCCCC',
          border: '1px solid #000000',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          zIndex: 101,
        }}
      >
        <Icon icon="pixel:times-solid" width={16} height={16} style={{ color: '#000000' }} />
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `${ATTACK_LABEL_W}px ${Y_CHIP_COL}px repeat(18, ${CELL}px)`,
          gridTemplateRows: `18px ${CELL}px repeat(18, ${CELL}px)`,
          columnGap: `${GAP}px`,
          rowGap: `${GAP}px`,
          alignItems: 'center',
          justifyItems: 'center',
        }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Defend label */}
        <div
          style={{
            gridColumn: '3 / 21',
            gridRow: 1,
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#000000',
            textAlign: 'center',
          }}
        >
          Defend
        </div>

        {/* X-axis chips */}
        {TYPE_ORDER.map((type, colIndex) => (
          <div
            key={`x-${type}`}
            style={{
              gridColumn: colIndex + 3,
              gridRow: 2,
            }}
          >
            <TypeChip type={type} highlighted={hovered?.defend === type} />
          </div>
        ))}

        {/* Attack label */}
        <div
          style={{
            gridColumn: 1,
            gridRow: '3 / 21',
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#000000',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            letterSpacing: '1px',
          }}
        >
          Attack
        </div>

        {/* Y-axis chips */}
        {TYPE_ORDER.map((attackType, rowIndex) => (
          <div
            key={`y-${attackType}`}
            style={{
              gridColumn: 2,
              gridRow: rowIndex + 3,
            }}
          >
            <TypeChip type={attackType} highlighted={hovered?.attack === attackType} />
          </div>
        ))}

        {/* Cells */}
        {TYPE_ORDER.map((attackType, rowIndex) =>
          TYPE_ORDER.map((defendType, colIndex) => {
            const value = getCellValue(attackType, defendType)
            const isHoveredCell =
              hovered?.attack === attackType && hovered?.defend === defendType
            const inHoveredRow = hovered?.attack === attackType
            const inHoveredCol = hovered?.defend === defendType

            let bg = '#FFFFFF'
            let color = '#000000'
            if (value === '0') {
              bg = '#555555'
              color = '#FFFFFF'
            } else if (value === '2') {
              bg = '#22AA22'
              color = '#FFFFFF'
            } else if (value === '1/2') {
              bg = '#CC2222'
              color = '#FFFFFF'
            } else if (inHoveredRow || inHoveredCol) {
              bg = '#F0F0F0'
            }

            return (
              <div
                key={`${attackType}-${defendType}`}
                onMouseEnter={() => setHovered({ attack: attackType, defend: defendType })}
                style={{
                  gridColumn: colIndex + 3,
                  gridRow: rowIndex + 3,
                  width: `${CELL}px`,
                  height: `${CELL}px`,
                  backgroundColor: bg,
                  border: isHoveredCell ? '2px solid #000000' : '1px solid #DDDDDD',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: value === '1/2' ? '7px' : '8px',
                  fontWeight: 'bold',
                  color,
                  imageRendering: 'pixelated',
                  cursor: 'crosshair',
                  zIndex: isHoveredCell ? 2 : 1,
                }}
              >
                {value}
              </div>
            )
          })
        )}
      </div>
      </div>
    </div>
  )
}

export default TypeEffectivenessChart
