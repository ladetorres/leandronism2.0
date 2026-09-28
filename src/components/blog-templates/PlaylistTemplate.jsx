import { useRef, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from '../LeftAlignedIcon'
import { bodyStyle, featuredStyle, headerStyle } from '../../styles/siteFonts'
import { markdownComponents, normalizeMarkdown } from './markdownContent.jsx'

// Wrapper components for Iconify icons to match the interface expected by LeftAlignedIcon
const PaintBrushIcon = ({ size, style }) => (
  <Icon icon="pixel:paint-brush-solid" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

const MusicIcon = ({ size, style }) => (
  <Icon icon="pixel:music" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

function PlaylistTemplate({ blog }) {
  const paletteContainerRef = useRef(null)
  const contentContainerRef = useRef(null)
  const [pageViews, setPageViews] = useState(null)
  const contentBlocks = Array.isArray(blog.content) ? blog.content : null

  // Fetch page view count
  useEffect(() => {
    const pageId = blog.urlPath.replace(/^\//, '').replace(/\//g, '-')
    fetch(`https://api.countapi.xyz/hit/leandronism.me/${pageId}`)
      .then(res => res.json())
      .then(data => setPageViews(data.value))
      .catch(() => setPageViews(null))
  }, [blog.urlPath])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F2F2F2', color: '#000000', ...bodyStyle }}>
      {/* Blank Space on Top */}
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: '#F2F2F2' }}></div>

      {/* Single color bar using backgroundColor */}
      <div className="w-full mb-16 h-[28px]" style={{ backgroundColor: blog.backgroundColor }}></div>

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

      {/* Horizontal line */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="border-t" style={{ borderColor: '#00000026' }}></div>
      </div>

      <div className="pb-16">
        {/* Content */}
        <div ref={contentContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto" style={{ color: '#000000' }}>
          {/* Music icon for xs - above the content */}
          <div className="sm:hidden mb-4">
            <Icon icon="pixel:music" width={32} height={32} style={{ color: '#000000', opacity: 0.9 }} className="icon-animated" />
          </div>

          {/* Content wrapper */}
          {contentBlocks ? (
            <div className="mb-12 max-w-full" style={{ width: '100%', marginTop: 0 }}>
              {contentBlocks.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <div key={index} className="mb-12 max-w-full" style={{ width: '100%' }}>
                      <div
                        className="leading-tight"
                        style={{
                          ...bodyStyle,
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        <ReactMarkdown components={markdownComponents}>
                          {normalizeMarkdown(block.text)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )
                }

                if (block.type === 'featured-line') {
                  return (
                    <div key={index} className="mb-12 max-w-full" style={{ width: '100%' }}>
                      <div
                        className="leading-tight"
                        style={{
                          ...featuredStyle,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        <ReactMarkdown components={markdownComponents}>
                          {normalizeMarkdown(block.text)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )
                }

                if (block.type === 'quote') {
                  return (
                    <div key={index} className="mb-12 max-w-full" style={{ width: '100%' }}>
                      <div
                        className="leading-tight"
                        style={{
                          ...bodyStyle,
                          overflowWrap: 'break-word',
                          whiteSpace: 'pre-wrap',
                          paddingLeft: '2em',
                          borderLeft: '2px solid #000000',
                          opacity: 0.8
                        }}
                      >
                        <span style={{ marginRight: '4px' }}>"</span>
                        <ReactMarkdown components={markdownComponents}>
                          {normalizeMarkdown(block.text)}
                        </ReactMarkdown>
                        <span style={{ marginLeft: '4px' }}>"</span>
                      </div>
                    </div>
                  )
                }

                if (block.type === 'divider') {
                  return (
                    <div key={index} className="mb-12 max-w-full" style={{ width: '100%' }}>
                      <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                        <div className="border-t" style={{ borderColor: '#00000026' }}></div>
                      </div>
                    </div>
                  )
                }

                return null
              })}
            </div>
          ) : (
            <div className="mb-12 max-w-full" style={{ width: '100%', marginTop: 0 }}>
              <p
                className="leading-tight"
                style={{
                  ...bodyStyle,
                  margin: 0
                }}
              >
                {blog.content}
              </p>
            </div>
          )}

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
              <div className="mb-6 max-w-full" style={{ width: '100%' }}>
                <p
                  className=""
                  style={bodyStyle}
                >
                  featured in this tracklist
                </p>
              </div>
              <div className="space-y-4">
                {blog.songs.map((song, index) => (
                  <div key={index} className="max-w-full" style={{ width: '100%' }}>
                    <p
                      className=""
                      style={bodyStyle}
                    >
                      <span style={{ marginRight: '10px' }}>{String(song.songIndex).padStart(2, '0')}</span>
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
                <Icon icon="pixel:paint-brush-solid" width={32} height={32} style={{ color: '#000000', opacity: 0.9 }} className="icon-animated" />
              </div>

              <div className="flex justify-between items-start gap-8">
                {/* Left side - Palette Line text */}
                {blog.paletteLine && (
                  <div className="flex-1 min-w-0">
                    <p
                      className=""
                      style={bodyStyle}
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
                      className="flex items-center gap-8 min-h-[40px]"
                    >
                      <div className="h-[20px] flex items-start">
                        <p
                          className=""
                          style={{
                            ...bodyStyle,
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
              color="#000000"
              containerRef={paletteContainerRef}
              gap={44}
              showAbove={false}
            />
          </>
        )}

        {/* Footer */}
        <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto">
          <div className="mt-28 pt-12 border-t" style={{ borderColor: '#00000026' }}>
            {/* Page Views */}
            {pageViews !== null && (
              <div className="mb-10 max-w-full" style={{ width: '100%' }}>
                <div>
                  <p
                    className="opacity-50"
                    style={bodyStyle}
                  >
                    Page views: {pageViews}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-10 max-w-full" style={{ width: '100%' }}>
                <div>
                  <p
                    className=""
                    style={bodyStyle}
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
          </div>
        </div>
      </div>

      {/* Left-aligned music icon for sm and up */}
      <LeftAlignedIcon
        Icon={MusicIcon}
        size={32}
        color="#000000"
        containerRef={contentContainerRef}
        gap={32}
        showAbove={false}
      />
    </div>
  )
}

export default PlaylistTemplate
