import { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from '../LeftAlignedIcon'
import PhonePhotoGallery from '../PhonePhotoGallery'
import { bodyStyle, headerStyle } from '../../styles/siteFonts'

// Wrapper components for Iconify icons to match the interface expected by LeftAlignedIcon
const PaintBrushIcon = ({ size, style }) => (
  <Icon icon="pixel:paint-brush-solid" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

const CameraIcon = ({ size, style }) => (
  <Icon icon="pixel:camera" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

function PhotoEssayTemplate({ blog }) {
  const paletteContainerRef = useRef(null)
  const contentContainerRef = useRef(null)
  const [pageViews, setPageViews] = useState(null)

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

      {/* Content */}
      <div ref={contentContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto pb-16">
        {/* Camera icon for xs - above the content */}
        <div className="sm:hidden mb-4">
          <Icon icon="pixel:camera" width={32} height={32} style={{ color: '#000000', opacity: 0.9 }} className="icon-animated" />
        </div>

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

        {/* Photos */}
        <div className="space-y-12">
          {blog.photos.map((photo, index) => (
            <div key={index} className="space-y-4">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full"
                style={{
                  background: 'white',
                  padding: '4px',
                  border: '1px solid #999'
                }}
              />
              {photo.caption && (
                <div className="w-full">
                  <div className="w-full sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px]">
                    <div style={{ margin: 0 }}>
                      <p
                        className="opacity-60 italic"
                        style={{
                          ...bodyStyle,
                          textAlign: 'left',
                          display: 'block'
                        }}
                      >
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Phone Photos Gallery */}
        {blog.phonePhotosGallery && (
          <PhonePhotoGallery
            phonePhotosGallery={blog.phonePhotosGallery}
            textColor="#000000"
          />
        )}

        {/* Color Palette Display */}
        {blog.colorPalette && blog.colorPalette.length > 0 && (
          <>
            <div ref={paletteContainerRef} className="w-full sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mt-28">
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

        {/* Date */}
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

          {blog.dateTaken && (
            <div className="mb-6 max-w-full" style={{ width: '100%' }}>
              <p
                className="opacity-50"
                style={bodyStyle}
              >
                Photos taken {blog.dateTaken}
              </p>
            </div>
          )}
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

      {/* Left-aligned camera icon for sm and up */}
      <LeftAlignedIcon
        Icon={CameraIcon}
        size={32}
        color="#000000"
        containerRef={contentContainerRef}
        gap={32}
        showAbove={false}
      />
    </div>
  )
}

export default PhotoEssayTemplate
