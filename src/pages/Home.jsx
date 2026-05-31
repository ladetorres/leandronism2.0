import { Link } from 'react-router-dom'

function Home() {
  const menuItems = [
    { name: 'blogs', path: '/blogs' },
    { name: 'photo essays', path: '/photo-essays' },
    { name: 'games', path: '/games' },
    { name: 'playlists', path: '/playlists' },
    { name: 'me', path: '/me' },
  ]

  return (
    <div className="min-h-screen bg-black text-white px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 flex items-center justify-center">
      <div className="w-full lg:max-w-[1110px] min-h-[480px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[700px] xl:min-h-[780px] flex items-center">
      {/* Desktop Layout (lg and up) */}
      <div className="hidden lg:flex lg:justify-between lg:items-start w-full">
        {/* Left side - Header and Subheader */}
        <div className="lg:max-w-xl">
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl mb-2 lg:mb-4">
            hi, i'm leandro
          </h1>
          <p className="font-serif text-lg lg:text-xl xl:text-2xl">
            i write code, take photos, and write stories
          </p>
        </div>

        {/* Right side - Menu */}
        <nav className="flex flex-col items-end gap-4 lg:gap-5 xl:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-display text-3xl lg:text-4xl xl:text-5xl hover:opacity-70 transition-opacity text-right"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile/Tablet Layout (md and below) */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Header and Subheader - Center aligned */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-5">
            hi, i'm leandro
          </h1>
          <p className="font-serif text-base sm:text-lg md:text-xl">
            i write code, take photos, and write stories
          </p>
        </div>

        {/* Menu - Centered */}
        <nav className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-display text-2xl sm:text-3xl md:text-4xl hover:opacity-70 transition-opacity"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      </div>
    </div>
  )
}

export default Home
