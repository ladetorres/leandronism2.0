import { useEffect, useState } from 'react'

// Retro 3-block stepped loading indicator (pixel / early Flash style)
function PixelLoading() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % 4)
    }, 180)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        width: '60px',
        height: '16px',
        imageRendering: 'pixelated'
      }}
    >
      {[0, 1, 2].map((i) => {
        // Frame 0: first on, 1: second on, 2: third on, 3: all on briefly
        const lit = frame === 3 || frame === i

        return (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: lit ? '#000000' : '#CCCCCC',
              border: '1px solid #000000',
              boxSizing: 'border-box',
              imageRendering: 'pixelated'
            }}
          />
        )
      })}
    </div>
  )
}

export default PixelLoading
