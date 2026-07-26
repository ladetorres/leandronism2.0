import { useEffect, useState } from 'react'

const FPS = 8 // 8 fps for SNES/early Flash aesthetics

// Sprite grid configuration per pokemon (by name)
const SPRITE_CONFIG = {
  'Venusaur': { cols: 4, rows: 8 },
  'Butterfree': { cols: 12, rows: 8 },
  'Raticate': { cols: 6, rows: 8 },
  'Ninetales': { cols: 14, rows: 8 },
  'Magneton': { cols: 4, rows: 8 },
  'Dodrio': { cols: 6, rows: 8 },
  'Gengar': { cols: 8, rows: 8 },
  'Omastar': { cols: 2, rows: 8 },
  'Zapdos': { cols: 4, rows: 8 },
  'Dugtrio': { cols: 2, rows: 8 },
  'Pinsir': { cols: 5, rows: 8 },
  'Umbreon': { cols: 14, rows: 8 },
  'Klinklang': { cols: 10, rows: 8 },
  'Tornadus': { cols: 9 , rows: 8 },
  'Serperior': { cols: 2, rows: 8 },
  'Eelektross': { cols: 6, rows: 8 },
  'Musharna': { cols: 6, rows: 8 },
  'Steelix': { cols: 4, rows: 8 },
  'Heracross': { cols: 6, rows: 8 },
  'Obstagoon': { cols: 4, rows: 8 },
  'Piloswine': { cols: 5, rows: 8 },
  'Tyranitar': { cols: 4, rows: 8 },
  'Swampert': { cols: 6, rows: 8 },
  'Gardevoir': { cols: 4, rows: 8 },
  'Shedinja': { cols: 12, rows: 8 },
  'Sableye': { cols: 2, rows: 8 },
  'Wailord': { cols: 6, rows: 8 },
  'Flygon': { cols: 7, rows: 8 },
  'Salamence': { cols: 14, rows: 8 },
  'Metagross': { cols: 2, rows: 8 },
  'Zekrom': { cols: 14, rows: 8 },
  'Heliolisk': { cols: 14, rows: 8 },
  'Volcarona': { cols: 7, rows: 8 },
  'Jynx': { cols: 4, rows: 8 },
  'Nihilego': { cols: 7, rows: 8 },
  'Torterra': { cols: 5, rows: 8 },
  'Drapion': { cols: 4, rows: 8 },
  'Gigalith': { cols: 9, rows: 8 },
  'Cofagrigus': { cols: 4, rows: 8 },
  'Garbodor': { cols: 4, rows: 8 },
  'Escavalier': { cols: 4, rows: 8 },
  'Ferrothorn': { cols: 2, rows: 8 },
  'Chandelure': { cols: 8, rows: 8 },
  'Hydreigon': { cols: 6, rows: 8 },
  'Machamp': { cols: 10, rows: 8 },
  'Diancie': { cols: 8, rows: 8 },
  'Florges': { cols: 4, rows: 8 },
  'Dedenne': { cols: 4, rows: 8 },
  'Azumarill': { cols: 4, rows: 8 },
  'Gallade': { cols: 5, rows: 8 },
  'Chesnaught': { cols: 8, rows: 8 },
  'Talonflame': { cols: 4, rows: 8 },
  'Dragalge': { cols: 8, rows: 8 },
  'Goodra': { cols: 7, rows: 8 },
  'Decidueye': { cols: 10, rows: 8 },
  'Wigglytuff': { cols: 4, rows: 8 },
  'Girafarig': { cols: 8, rows: 8 },
  'Volcanion': { cols: 8, rows: 8 },
  'Blaziken': { cols: 2, rows: 8 },
  'Avalugg': { cols: 4, rows: 8 },
  'Cloyster': { cols: 6, rows: 8 },
  'Crabominable': { cols: 4, rows: 8 },
  'Aurorus': { cols: 14, rows: 8 },
}

function SpriteAnimation({ spriteFileName, pokemonName, scale = 1 }) {
  const [frame, setFrame] = useState(0)
  const [frameWidth, setFrameWidth] = useState(32)
  const [frameHeight, setFrameHeight] = useState(32)

  // Get sprite config for this pokemon, default to 12x8
  const config = SPRITE_CONFIG[pokemonName] || { cols: 12, rows: 8 }
  const COLS = config.cols
  const ROWS = config.rows
  const TOTAL_FRAMES = COLS * ROWS

  // Extract just the filename from the path if it includes 'public/'
  const spritePath = spriteFileName.startsWith('public/')
    ? '/' + spriteFileName.replace('public/', '')
    : spriteFileName

  // Load sprite sheet to calculate frame dimensions
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const calculatedFrameWidth = img.width / COLS
      const calculatedFrameHeight = img.height / ROWS
      setFrameWidth(calculatedFrameWidth)
      setFrameHeight(calculatedFrameHeight)
    }
    img.src = spritePath
  }, [spritePath, COLS, ROWS, pokemonName])

  // Animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES)
    }, 1000 / FPS)

    return () => clearInterval(timer)
  }, [TOTAL_FRAMES])

  const col = frame % COLS
  const row = Math.floor(frame / COLS)

  const x = -(col * frameWidth)
  const y = -(row * frameHeight)

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${spritePath})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${x}px ${y}px`,
        imageRendering: 'pixelated',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    />
  )
}

export default SpriteAnimation
