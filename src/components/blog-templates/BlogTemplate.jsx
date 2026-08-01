import { useRef, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from '../LeftAlignedIcon'

// Wrapper components for Iconify icons to match the interface expected by LeftAlignedIcon
const PaintBrushIcon = ({ size, style }) => (
  <Icon icon="pixel:paint-brush-solid" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

const PenIcon = ({ size, style }) => (
  <Icon icon="pixel:pen" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

function BlogTemplate({ blog }) {
  const fontFamily = blog.font === 'tahoma' ? 'Tahoma, Geneva, Verdana, sans-serif' : undefined
  const useTahoma = blog.font === 'tahoma'
  const paletteContainerRef = useRef(null)
  const contentContainerRef = useRef(null)
  const contentRefs = useRef([])
  const [contentHeights, setContentHeights] = useState([])
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

  // Measure content block heights after render
  useEffect(() => {
    const heights = contentRefs.current.map((ref, index) => {
      if (ref && blog.content[index]) {
        const block = blog.content[index]
        // Get the scrollHeight and multiply by scale factor
        const baseHeight = ref.scrollHeight
        let scaleFactor = 8 // default for paragraph and quote
        
        // Featured line uses scale(10)
        if (block.type === 'featured-line') {
          scaleFactor = 10
        }
        
        // Divider doesn't need scaling
        if (block.type === 'divider') {
          return baseHeight
        }
        
        return baseHeight * scaleFactor
      }
      return 0
    })
    setContentHeights(heights)
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
    <div className="min-h-screen relative" style={{ backgroundColor: '#F2F2F2', color: '#000000', fontFamily }}>
      {/* Blank Space on Top */}
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: '#F2F2F2' }}></div>

      {/* Single color bar using backgroundColor */}
      <div className="w-full mb-16 h-[28px]" style={{ backgroundColor: blog.backgroundColor }}></div>

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

      {/* Horizontal line */}
      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="border-t" style={{ borderColor: '#00000026' }}></div>
      </div>

      <div className="pb-16">
        {/* Content */}
        <div ref={contentContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto" style={{ color: '#000000' }}>
          {/* Pen icon for xs - above the content */}
          <div className="sm:hidden mb-4">
            <Icon icon="pixel:pen" width={32} height={32} style={{ color: '#000000', opacity: 0.9 }} className="icon-animated" />
          </div>

          {/* Content wrapper */}
          <div className="mb-12 max-w-full" style={{ width: '100%' }}>
            {blog.content.map((block, index) => {
              // Paragraph type
              if (block.type === 'paragraph') {
                return (
                  <div key={index} className="mb-12 max-w-full" style={{ width: '100%', minHeight: `${contentHeights[index] || 20}px` }}>
                    <div
                      ref={el => contentRefs.current[index] = el}
                      className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`}
                      style={{
                        ...retroStyles,
                        fontFamily,
                        width: '12.5%',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <span style={{ display: 'inline', width: '100%' }} {...props} />,
                          strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold', display: 'inline' }} {...props} />,
                          em: ({node, ...props}) => <em style={{ fontStyle: 'italic', display: 'inline' }} {...props} />,
                          code: ({node, inline, ...props}) => <code style={{ display: 'inline', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }} {...props} />,
                        }}
                      >
                        {block.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              }

              // Featured line type (bigger text)
              if (block.type === 'featured-line') {
                return (
                  <div key={index} className="mb-12 max-w-full" style={{ width: '100%', minHeight: `${contentHeights[index] || 20}px` }}>
                    <div
                      ref={el => contentRefs.current[index] = el}
                      className={`${useTahoma ? '' : 'font-serif'} text-size-3 leading-tight`}
                      style={{
                        transform: 'scale(10)',
                        transformOrigin: 'top left',
                        imageRendering: 'pixelated',
                        WebkitFontSmoothing: 'none',
                        MozOsxFontSmoothing: 'grayscale',
                        lineHeight: '1.25',
                        fontFamily,
                        width: '10%',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <span style={{ display: 'inline', width: '100%' }} {...props} />,
                          strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold', display: 'inline' }} {...props} />,
                          em: ({node, ...props}) => <em style={{ fontStyle: 'italic', display: 'inline' }} {...props} />,
                          code: ({node, inline, ...props}) => <code style={{ display: 'inline', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }} {...props} />,
                        }}
                      >
                        {block.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              }

              // Quote type (early 2000s style with ASCII quote marks)
              if (block.type === 'quote') {
                return (
                  <div key={index} className="mb-12 max-w-full" style={{ width: '100%', minHeight: `${contentHeights[index] || 20}px` }}>
                    <div
                      ref={el => contentRefs.current[index] = el}
                      className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`}
                      style={{
                        ...retroStyles,
                        fontFamily,
                        width: '12.5%',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                        paddingLeft: '2em',
                        borderLeft: '2px solid #000000',
                        opacity: 0.8
                      }}
                    >
                      <span style={{ marginRight: '4px' }}>"</span>
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <span style={{ display: 'inline', width: '100%' }} {...props} />,
                          strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold', display: 'inline' }} {...props} />,
                          em: ({node, ...props}) => <em style={{ fontStyle: 'italic', display: 'inline' }} {...props} />,
                          code: ({node, inline, ...props}) => <code style={{ display: 'inline', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }} {...props} />,
                        }}
                      >
                        {block.text}
                      </ReactMarkdown>
                      <span style={{ marginLeft: '4px' }}>"</span>
                    </div>
                  </div>
                )
              }

              // Divider type (horizontal line)
              if (block.type === 'divider') {
                return (
                  <div key={index} className="mb-12 max-w-full" style={{ width: '100%' }}>
                    <div ref={el => contentRefs.current[index] = el} style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                      <div className="border-t" style={{ borderColor: '#00000026' }}></div>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
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

      {/* Left-aligned pen icon for sm and up */}
      <LeftAlignedIcon
        Icon={PenIcon}
        size={32}
        color="#000000"
        containerRef={contentContainerRef}
        gap={32}
        showAbove={false}
      />
    </div>
  )
}

export default BlogTemplate
