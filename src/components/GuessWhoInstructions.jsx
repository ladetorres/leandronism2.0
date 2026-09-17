import GuessWhoInstructionsContent from './GuessWhoInstructionsContent'
import GuessWhoTextPopup from './GuessWhoTextPopup'

function GuessWhoInstructions({ onClose }) {
  return (
    <GuessWhoTextPopup title="Instructions" onClose={onClose}>
      <GuessWhoInstructionsContent />
    </GuessWhoTextPopup>
  )
}

export default GuessWhoInstructions
