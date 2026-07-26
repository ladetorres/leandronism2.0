import { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from '../LeftAlignedIcon'

// Wrapper components for Iconify icons to match the interface expected by LeftAlignedIcon
const PaintBrushIcon = ({ size, style }) => (
  <Icon icon="pixel:paint-brush-solid" width={size} height={size} style={{ ...style, opacity: 0.9 }} className="icon-animated" />
)

const MusicIcon = ({ size, style }) => (
  <Icon icon="pixel:music" width={size} height={size} style={{ ...style, opacity: 0.9 }} className="icon-animated" />
)

function PlaylistTemplate({ blog }) {
  const fontFamily = blog.font === 'tahoma' ? 'Tahoma, Geneva, Verdana, sans-serif' : undefined
  const useTahoma = blog.font === 'tahoma'
  const paletteContainerRef = useRef(null)
  const contentContainerRef = useRef(null)
  const contentTextRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [pageViews, setPageViews] = useState(null)

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

  // Measure content text height after render
  useEffect(() => {
    if (contentTextRef.current) {
      const baseHeight = contentTextRef.current.scrollHeight
      const scaledHeight = baseHeight * 8
      setContentHeight(scaledHeight + 32) // Add 32px buffer
    }
  }, [blog.content])

  // Fetch page view count
  useEffect(() => {
    const pageId = blog.urlPath.replace(/^\//, '').replace(/\//g, '-')
    fetch(`https://api.countapi.xyz/hit/leandronism.me/${pageId}`)
      .then(res => res.json())
      .then(data => setPageViews(data.value))
      .catch(() => setPageViews(null))
  }, [blog.urlPath])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: blog.backgroundColor, color: blog.textColor, fontFamily }}>
      {/* Blank Space on Top */}
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: blog.backgroundColor }}></div>

      {/* Color Palette Lines - Small screens (full width) */}
      {blog.colorPalette && blog.colorPalette.length > 0 && (
        <div className="w-full lg:hidden mb-16">
          {blog.colorPalette.map((color, index) => (
            <div key={index} className="h-[9px]" style={{ backgroundColor: color }}></div>
          ))}
        </div>
      )}

      {/* Top horizontal bars - Large screens */}
      {blog.colorPalette && blog.colorPalette.length > 0 && (
        <div className="hidden lg:block w-full mb-16">
          {blog.colorPalette.map((color, index) => (
            <div key={index} className="h-[9px] w-full" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}

      {/* Title and Subtitle */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto">
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

      {/* Horizontal line */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="border-t" style={{ borderColor: `${blog.textColor}1a` }}></div>
      </div>

      <div className="pb-16">
        {/* Content */}
        <div ref={contentContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto" style={{ color: blog.textColor }}>
          {/* Music icon for xs - above the content */}
          <div className="sm:hidden mb-4">
            <Icon icon="pixel:music" width={32} height={32} style={{ color: blog.textColor, opacity: 0.9 }} className="icon-animated" />
          </div>

          {/* Content wrapper to account for scaled text height */}
          <div className="mb-12 max-w-full" style={{ minHeight: `${contentHeight}px`, width: '100%', marginTop: 0 }}>
            <p
              ref={contentTextRef}
              className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`}
              style={{
                ...retroStyles,
                fontFamily,
                width: '12.5%',
                wordBreak: 'break-word',
                margin: 0
              }}
            >
              {blog.content}
            </p>
          </div>

          {/* Spotify Embed */}
          {blog.playlistEmbed && (
            <div className="mb-12">
              <iframe
                src={blog.playlistEmbed}
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
                style={{
                  background: 'white',
                  padding: '4px',
                  border: '1px solid #999'
                }}
              ></iframe>
            </div>
          )}

          {/* Song List */}
          {blog.songs && blog.songs.length > 0 && (
            <div className="mb-12">
              <div className="mb-6 max-w-full" style={{ width: '100%', minHeight: '20px' }}>
                <p
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                  style={{
                    ...retroStyles,
                    fontFamily,
                    width: '12.5%',
                    wordBreak: 'break-word'
                  }}
                >
                  featured in this tracklist
                </p>
              </div>
              <div className="space-y-4">
                {blog.songs.map((song, index) => (
                  <div key={index} className="max-w-full" style={{ width: '100%', minHeight: '20px' }}>
                    <p
                      className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                      style={{
                        ...retroStyles,
                        fontFamily,
                        width: '12.5%',
                        wordBreak: 'break-word'
                      }}
                    >
                      <span style={{ marginRight: '4px' }}>{String(index + 1).padStart(2, '0')}</span>
                      <span>{song.title}</span>
                      <span style={{ opacity: 0.5 }}> — {song.artist}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color Palette Display */}
        {blog.colorPalette && blog.colorPalette.length > 0 && (
          <>
            <div ref={paletteContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mt-28">
              {/* Palette icon for xs - above the palette */}
              <div className="sm:hidden mb-4">
                <Icon icon="pixel:paint-brush-solid" width={32} height={32} style={{ color: blog.textColor, opacity: 0.9 }} className="icon-animated" />
              </div>

              <div className="flex justify-between items-start gap-8">
                {/* Left side - Palette Line text */}
                {blog.paletteLine && (
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                      style={{
                        ...retroStyles,
                        fontFamily,
                        width: '12.5%',
                        wordBreak: 'break-word'
                      }}
                    >
                      {blog.paletteLine}
                    </p>
                  </div>
                )}

                {/* Right side - Vertical color bars */}
                <div className="flex flex-col flex-shrink-0 items-end">
                  {blog.colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-16 min-h-[40px]"
                    >
                      <div className="h-[20px] flex items-start">
                        <p
                          className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                          style={{
                            ...retroStyles,
                            fontFamily,
                            width: 'auto',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {color}
                        </p>
                      </div>
                      <div
                        className="h-[40px] w-[62px] flex-shrink-0"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Left-aligned icon for sm and up */}
            <LeftAlignedIcon
              Icon={PaintBrushIcon}
              size={32}
              color={blog.textColor}
              containerRef={paletteContainerRef}
              gap={44}
              showAbove={false}
            />
          </>
        )}

        {/* Footer */}
        <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto">
          <div className="mt-28 pt-12 border-t" style={{ borderColor: `${blog.textColor}1a` }}>
            {/* Page Views */}
            {pageViews !== null && (
              <div className="mb-10 max-w-full" style={{ width: '100%', minHeight: '20px' }}>
                <div style={{ width: '12.5%' }}>
                  <p
                    className={`${useTahoma ? '' : 'font-serif'} text-size-2 opacity-50`}
                    style={{
                      ...retroStyles,
                      fontFamily,
                      wordBreak: 'break-word'
                    }}
                  >
                    Page views: {pageViews}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-10 max-w-full" style={{ width: '100%', minHeight: '20px' }}>
                <div style={{ width: '12.5%' }}>
                  <p
                    className={`${useTahoma ? '' : 'font-serif'} text-size-2`}
                    style={{ ...retroStyles, fontFamily }}
                  >
                    <span style={{ marginRight: '4px', opacity: 0.5 }}>Tags:</span>{blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: 'var(--link-color)',
                          cursor: 'pointer',
                          marginRight: index < blog.tags.length - 1 ? '3px' : '0'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {/* Published date */}
            <div className="max-w-full" style={{ width: '100%', minHeight: '20px' }}>
              <p
                className={`${useTahoma ? '' : 'font-serif'} text-size-2 opacity-50`}
                style={{
                  ...retroStyles,
                  fontFamily,
                  width: '12.5%',
                  wordBreak: 'break-word'
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
        </div>
      </div>

      {/* Left-aligned music icon for sm and up */}
      <LeftAlignedIcon
        Icon={MusicIcon}
        size={32}
        color={blog.textColor}
        containerRef={contentContainerRef}
        gap={32}
        showAbove={false}
      />
    </div>
  )
}

export default PlaylistTemplate
