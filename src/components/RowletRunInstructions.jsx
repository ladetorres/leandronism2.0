import GuessWhoTextPopup, { paragraphStyle } from './GuessWhoTextPopup'

function RowletRunInstructions({ onClose }) {
  return (
    <GuessWhoTextPopup title="Instructions" onClose={onClose}>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </GuessWhoTextPopup>
  )
}

export default RowletRunInstructions
