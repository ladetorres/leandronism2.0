import GuessWhoGridInfoContent from './GuessWhoGridInfoContent'
import GuessWhoTextPopup from './GuessWhoTextPopup'

function GuessWhoGridInfo({ onClose }) {
  return (
    <GuessWhoTextPopup title="Grid" onClose={onClose}>
      <GuessWhoGridInfoContent />
    </GuessWhoTextPopup>
  )
}

export default GuessWhoGridInfo
