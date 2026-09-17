import { headingStyle, paragraphStyle } from './GuessWhoTextPopup'

function GuessWhoGridInfoContent() {
  return (
    <>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        Our grid is a balanced list of 42 Pokémons, each with detailed characteristics: typing,
        evolution stage, and generation when they were released.
      </p>

      <h3
        style={{
          ...headingStyle,
          margin: '0 0 10px',
          fontSize: '15px',
        }}
      >
        Typings
      </h3>

      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        Each type are represented by at least three Pokémons. No Fairy types.
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        - 22 dual types and 20 single types.
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        6 Pokémon are Starters, and 8 are Legendaries.
      </p>
      <h3
        style={{
          ...headingStyle,
          margin: '0 0 10px',
          fontSize: '15px',
        }}
      >
        Evolutions
      </h3>

      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        - 15 are base evolution
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        - 14 are final evolution
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        - and 13 are single evolution (does not evolve).
      </p>

      <h3
        style={{
          ...headingStyle,
          margin: '0 0 10px',
          fontSize: '15px',
        }}
      >
        Gen
      </h3>

      <p style={paragraphStyle}>
        Only includes up to Gen IV:
      </p>

      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        12 from Gen I
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        9 from Gen II
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0' }}>
        10 from Gen III
      </p>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        and 11 from Gen IV.
      </p>
    </>
  )
}

export default GuessWhoGridInfoContent
