import PokemonParty from '../../games/PokemonParty'
import PokemonGuessWho from '../../games/PokemonGuessWho'
import { bodyStyle, headerStyle } from '../../styles/siteFonts'

// Map of game paths to components + viewport / canvas config
const gameComponents = {
  '/games/PokemonParty.jsx': {
    Component: PokemonParty,
    // Playable at xl (1280px) and up
    playableClass: 'hidden xl:flex xl:justify-center xl:items-center',
    notPlayableClass: 'xl:hidden',
    notPlayableMessage: 'Only playable on screens >= 1280px',
    canvasStyle: {
      width: '900px',
      height: '600px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #999',
      overflow: 'hidden',
    },
  },
  '/games/PokemonGuessWho.jsx': {
    Component: PokemonGuessWho,
    // Playable below md (max-width: 767px)
    playableClass: 'flex justify-center items-center md:hidden',
    notPlayableClass: 'hidden md:block',
    notPlayableMessage: 'Only playable on screens < 767px',
    canvasStyle: {
      width: '100%',
      maxWidth: '100%',
      height: '580px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #999',
      overflow: 'hidden',
    },
  },
}

function GameTemplate({ blog }) {
  const gameConfig = blog.gamePath ? gameComponents[blog.gamePath] : null
  const GameComponent = gameConfig?.Component ?? null

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F2F2F2', color: '#000000', ...bodyStyle }}>
      {/* Blank Space on Top */}
      <div className="h-[60px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: '#F2F2F2' }}></div>

      {/* Title and Subtitle */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="max-w-full" style={{ width: '100%' }}>
          <h1
            className="leading-tight"
            style={headerStyle}
          >
            {blog.title}
          </h1>
        </div>
        {blog.subtitle && (
          <div className="mb-8 md:mb-10 max-w-full" style={{ width: '100%' }}>
            <p
              className="leading-tight"
              style={bodyStyle}
            >
              {blog.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Game Content */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-none mx-auto pb-16">
        {gameConfig && (
          <>
            <div className={gameConfig.notPlayableClass}>
              <div className="max-w-full" style={{ width: '100%' }}>
                <p
                  className="leading-tight"
                  style={bodyStyle}
                >
                  {gameConfig.notPlayableMessage}
                </p>
              </div>
            </div>

            <div className={gameConfig.playableClass}>
              <div style={gameConfig.canvasStyle}>
                {GameComponent && <GameComponent />}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto pb-16">
        <div className="mt-28 pt-12 border-t" style={{ borderColor: '#00000026' }}>
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-10 max-w-full" style={{ width: '100%' }}>
              <p
                className=""
                style={{ ...bodyStyle, opacity: 0.5 }}
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
          )}

          {blog.date && (
            <div className="max-w-full" style={{ width: '100%' }}>
              <p
                className="opacity-50"
                style={bodyStyle}
              >
                Published {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTemplate
