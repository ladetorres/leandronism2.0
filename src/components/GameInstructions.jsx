import { Icon } from '@iconify/react'

function GameInstructions({ onClose }) {
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
        aria-label="Instructions"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '485px',
          height: '501px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #000000',
          borderRadius: '6px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
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
            flex: 1,
            overflowY: 'auto',
            padding: '28px 20px 20px',
            boxSizing: 'border-box',
            fontFamily: 'monospace',
            color: '#000000',
          }}
        >
          <h2
            style={{
              margin: '0 0 16px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Instructions
          </h2>

          <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.5 }}>
            A simple Pokémon type battle simulator. From a pool of 23 pokémons, choose your party
            of six to battle it out with the Computer!
          </p>

          {/*<p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.5 }}>*/}
          {/*  this is another paragraph. this is another paragraph. this is another paragraph.*/}
          {/*</p>*/}

          <h3
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Classic Mode
          </h3>

          <p style={{ margin: '0 0 14px', fontSize: '13px', lineHeight: 1.5 }}>
            You get to select your party of six. Computer will then select its own party from
            the remaining pool.
          </p>

          <h3
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Captain's Mode
          </h3>

          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            Instead of you completing your party first, you and the computer take turns picking.
            The sequence of picks will be:
          </p>

          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            A - BB - AA - BB - AAA - BB
          </p>

          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            You decide if you prefer to pick first (you will be A), or you pick last (you will be B).
          </p>


          <h3
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            The Pool of Pokémon
          </h3>

          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            I have a curated list of 63 pokémons to represent all 18 types exactly six times: five unique
            dual types and a lone single type. Every game start and reset, we randomly select 23 to be our game pool.
          </p>

          <h3
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            The Matches
          </h3>

          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            Once you and computer are ready with your parties of six, you will take turns selecting one pokémon
            each to go head-to-head type match-up. The rules follow standard type effectiveness chart. Examples:
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            water type vs fire type - <span style={{ fontWeight: 600 }}>water wins</span>
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            ghost vs normal type - draw
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            grass vs ice + electric type - <span style={{ fontWeight: 600 }}>grass wins</span> as
            grass deals normal damage to both, but both ice and electric deal 1/2x to grass
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            grass + fire vs bug + steel type - <span style={{ fontWeight: 600 }}>bug + steel wins</span> though
            grass is 1/4x effective, fire is 4x, against bug's 1x and steel's 1/2x
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13px', lineHeight: 1.5 }}>
            The side that scores the most out of five wins!
          </p>

        </div>
      </div>
    </div>
  )
}

export default GameInstructions
