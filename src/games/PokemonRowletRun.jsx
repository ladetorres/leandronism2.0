import { useState } from 'react'
import { Icon } from '@iconify/react'
import RowletRunInstructions from '../components/RowletRunInstructions'
import { RunnerSpriteAnimation } from '../data/game-files/rowletFunctions'
import {
  dugtrioAttackAnim,
  dugtrioHopAnim,
  dugtrioHurtAnim,
  dugtrioWalkAnim,
  miloticAttackAnim,
  miloticHopAnim,
  miloticHurtAnim,
  miloticWalkAnim,
  onyxAttackAnim,
  onyxHopAnim,
  onyxHurtAnim,
  onyxWalkAnim,
  rowletAttackAnim,
  rowletHopAnim,
  rowletHurtAnim,
  rowletWalkAnim,
  shedinjaAttackAnim,
  shedinjaHopAnim,
  shedinjaHurtAnim,
  shedinjaWalkAnim,
  sylveonAttackAnim,
  sylveonHopAnim,
  sylveonHurtAnim,
  sylveonWalkAnim,
} from '../data/game-files/rowletRunRunners'

const walkAnims = [
  rowletWalkAnim,
  shedinjaWalkAnim,
  miloticWalkAnim,
  sylveonWalkAnim,
  onyxWalkAnim,
  dugtrioWalkAnim,
]

const hopAnims = [
  rowletHopAnim,
  shedinjaHopAnim,
  miloticHopAnim,
  sylveonHopAnim,
  onyxHopAnim,
  dugtrioHopAnim,
]

const attackAnims = [
  rowletAttackAnim,
  shedinjaAttackAnim,
  miloticAttackAnim,
  sylveonAttackAnim,
  onyxAttackAnim,
  dugtrioAttackAnim,
]

const hurtAnims = [
  rowletHurtAnim,
  shedinjaHurtAnim,
  miloticHurtAnim,
  sylveonHurtAnim,
  onyxHurtAnim,
  dugtrioHurtAnim,
]

const animationRows = [
  walkAnims,
  hopAnims,
  attackAnims.slice(0, 3),
  attackAnims.slice(3),
  hurtAnims,
]

function readStoredInteger(key) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null || raw.trim() === '') return 0
    const value = Number(raw)
    return Number.isInteger(value) ? value : 0
  } catch {
    return 0
  }
}

function loadRowletRunPlayerData() {
  return {
    playerHighScore: readStoredInteger('rowlet_run_high_score'),
    savedPokeballs: readStoredInteger('rowlet_run_saved_pokeballs'),
    runnersList: {
      rowlet: readStoredInteger('rowlet_run_1_rowlet'),
      shedinja: readStoredInteger('rowlet_run_2_shedinja'),
      milotic: readStoredInteger('rowlet_run_3_milotic'),
      sylveon: readStoredInteger('rowlet_run_4_sylveon'),
      onyx: readStoredInteger('rowlet_run_5_onyx'),
      dugtrio: readStoredInteger('rowlet_run_6_dugtrio'),
    },
  }
}

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

function PokemonRowletRun() {
  const [showInstructions, setShowInstructions] = useState(false)
  // Read once on load. Gameplay will use these; local storage is not written yet.
  // eslint-disable-next-line no-unused-vars
  const [{ playerHighScore, savedPokeballs, runnersList }] = useState(loadRowletRunPlayerData)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {showInstructions && (
        <RowletRunInstructions onClose={() => setShowInstructions(false)} />
      )}

      <div style={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        <button
          type="button"
          title="Reset game"
          style={navButtonStyle}
          onClick={() => {}}
        >
          <Icon icon="pixel:refresh" width={20} height={20} style={{ color: '#000000' }} />
        </button>

        <button
          type="button"
          title="Instructions"
          style={navButtonStyle}
          onClick={() => setShowInstructions(true)}
        >
          <Icon icon="pixel:question" width={20} height={20} style={{ color: '#000000' }} />
        </button>
      </div>

      <div style={{
        width: '100%',
        height: '540px',
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {animationRows.map((anims, index) => (
          <div
            key={anims[0].name}
            style={{
              position: 'absolute',
              top: index * 100,
              left: 0,
              right: 0,
              zIndex: index + 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            {anims.map((anim) => (
              <RunnerSpriteAnimation
                key={anim.name}
                fileName={anim.spriteFileName}
                duration={anim.animDuration}
                rows={anim.spriteRows}
                cols={anim.spriteCols}
                row={anim.animRowStart}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonRowletRun
