import { headingStyle, paragraphStyle } from './GuessWhoTextPopup'

function GuessWhoInstructionsContent() {
  return (
    <>
      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        This is a variation of the popular Guess Who? board game. Instead of human portraits, we'll play with
        Pokémon characters!
      </p>

      <h3
        style={{
          ...headingStyle,
          margin: '0 0 10px',
          fontSize: '15px',
        }}
      >
        Setup
      </h3>

      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        You and another player first chooses a mystery Pokémon character that the other player will have to guess.
        You'll take turns asking each other a simple "yes or no" question about their secret Pokémon character.
      </p>

      <p style={{ ...paragraphStyle, margin: '0 0 14px' }}>
        Example: "Is your Pokémon a Grass-type?" or "Is your Pokémon Legendary?". The other player should truthfully
        answer "Yes" or "No". Based on their answer, you can flip down the Pokémons that don't match the description.
      </p>

      <h3
        style={{
          ...headingStyle,
          margin: '0 0 10px',
          fontSize: '15px',
        }}
      >
        Guessing and Winning the Game
      </h3>

      <p style={paragraphStyle}>
        Instead of asking a question, you can declare, "Your Pokémon is Pikachu!". You win if you guess correctly.
      </p>
    </>
  )
}

export default GuessWhoInstructionsContent
