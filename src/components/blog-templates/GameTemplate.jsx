import { useRef, useEffect } from 'react'
import PokemonParty from '../../games/PokemonParty'

// Map of game paths to components
const gameComponents = {
  '/games/PokemonParty.jsx': PokemonParty,
}

function GameTemplate({ blog }) {
  const fontFamily = blog.font === 'tahoma' ? 'Tahoma, Geneva, Verdana, sans-serif' : undefined
  const useTahoma = blog.font === 'tahoma'

  // Get the game component
  const GameComponent = blog.gamePath ? gameComponents[blog.gamePath] : null

  // Retro pixelated text effect styles
  const retroStyles = {
    transform: 'scale(8)',
    transformOrigin: 'top left',
    imageRendering: 'pixelated',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: '1.25'
  }

  // Title-specific retro styles with aggressive scale
  const titleRetroStyles = {
    transform: 'scale(21.33)',
    transformOrigin: 'top left',
    imageRendering: 'pixelated',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: '1.25'
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F2F2F2', color: '#000000', fontFamily }}>
      {/* Blank Space on Top */}
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: '#F2F2F2' }}></div>

      {/* Title and Subtitle */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        {/* Title wrapper with proper height for scaled text */}
        <div className="max-w-full" style={{ width: '100%', height: 'auto', minHeight: '40px' }}>
          <h1
            className={`${useTahoma ? '' : 'font-display'} text-size-1 leading-tight`}
            style={{
              ...titleRetroStyles,
              fontFamily,
              width: '4.688%',
              wordBreak: 'break-word'
            }}
          >
            {blog.title}
          </h1>
        </div>
        {/* Subtitle wrapper with proper height for scaled text */}
        {blog.subtitle && (
          <div className="mb-8 md:mb-10 max-w-full" style={{ width: '100%', height: 'auto', minHeight: '20px' }}>
            <p
              className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`}
              style={{
                ...retroStyles,
                fontFamily,
                width: '12.5%',
                wordBreak: 'break-word'
              }}
            >
              {blog.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Game Content */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-none mx-auto pb-16">
        {/* Message for small screens */}
        <div className="xl:hidden">
          <div className="max-w-full" style={{ width: '100%', minHeight: '20px' }}>
            <p
              className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`}
              style={{
                ...retroStyles,
                fontFamily,
                width: '12.5%'
              }}
            >
              Only available on screens &gt;= 1280px
            </p>
          </div>
        </div>

        {/* Game canvas for xl screens */}
        <div className="hidden xl:flex xl:justify-center xl:items-center">
          <div 
            style={{ 
              width: '900px', 
              height: '600px', 
              backgroundColor: '#FFFFFF',
              border: '1px solid #999',
              overflow: 'hidden'
            }}
          >
            {GameComponent && <GameComponent />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto pb-16">
        <div className="mt-28 pt-12 border-t" style={{ borderColor: '#00000026' }}>
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-10 max-w-full" style={{ width: '100%', minHeight: '20px' }}>
              <div style={{ width: '12.5%' }}>
                <p
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                  style={{
                    ...retroStyles,
                    fontFamily,
                    opacity: 0.5
                  }}
                >
                  Tags:{' '}
                  {blog.tags.map((tag, index) => (
                    <span key={index}>
                      <a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                        style={{ 
                          color: 'var(--link-color)', 
                          textDecoration: 'none',
                          opacity: 1
                        }}
                      >
                        {tag}
                      </a>
                      {index < blog.tags.length - 1 && <span style={{ marginLeft: '3px', marginRight: '3px' }}> </span>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )}

          {/* Date */}
          {blog.date && (
            <div className="max-w-full" style={{ width: '100%', minHeight: '20px' }}>
              <div style={{ width: '12.5%' }}>
                <p
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2 opacity-50`}
                  style={{
                    ...retroStyles,
                    fontFamily
                  }}
                >
                  Published {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTemplate
