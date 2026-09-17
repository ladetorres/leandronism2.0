import { Icon } from '@iconify/react'

export const FONT_FAMILY = "'Futura LT Pro', 'Futura', sans-serif"

export const textStyle = {
  fontFamily: FONT_FAMILY,
  fontWeight: 300,
}

export const headingStyle = {
  fontFamily: FONT_FAMILY,
  fontWeight: 500,
}

export const paragraphStyle = {
  ...textStyle,
  margin: '0 0 10px',
  fontSize: '13px',
  lineHeight: 1.5,
}

function GuessWhoTextPopup({ title, ariaLabel, onClose, children }) {
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
        aria-label={ariaLabel ?? title}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'calc(100% - 56px)',
          height: 'calc(100% - 56px)',
          backgroundColor: '#FFFFFF',
          border: '1px solid #000000',
          borderRadius: '6px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ...textStyle,
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
            color: '#000000',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            ...textStyle,
          }}
        >
          <h2
            style={{
              ...headingStyle,
              margin: '0 0 16px',
              fontSize: '18px',
            }}
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  )
}

export default GuessWhoTextPopup
