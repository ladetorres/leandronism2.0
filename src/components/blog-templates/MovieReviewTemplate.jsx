import { useRef, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from '../LeftAlignedIcon'
import MovieScreenshotGallery from '../MovieScreenshotGallery'
import { bodyStyle, headerStyle, listingTitleStyle } from '../../styles/siteFonts'
import { MarkdownContentBlocks } from './markdownContent.jsx'

const PenIcon = ({ size, style }) => (
  <Icon icon="pixel:pen" width={size} height={size} style={{ ...style, color: '#000000', opacity: 0.9 }} className="icon-animated" />
)

function RatingEmojis({ emoji, rating }) {
  const fullCount = Math.floor(rating)
  const hasHalf = rating % 1 !== 0

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
      {Array.from({ length: fullCount }, (_, index) => (
        <span key={index} style={{ display: 'inline-block' }}>{emoji}</span>
      ))}
      {hasHalf && (
        <span
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            width: '0.5em',
            lineHeight: 1,
          }}
        >
          <span style={{ display: 'inline-block' }}>{emoji}</span>
        </span>
      )}
    </span>
  )
}

function MovieReviewTemplate({ blog }) {
  const contentContainerRef = useRef(null)
  const [pageViews, setPageViews] = useState(null)
  const photosFolder = blog.photosFolder || 'cosmic-horror'

  useEffect(() => {
    const pageId = blog.urlPath.replace(/^\//, '').replace(/\//g, '-')
    fetch(`https://api.countapi.xyz/hit/leandronism.me/${pageId}`)
      .then(res => res.json())
      .then(data => setPageViews(data.value))
      .catch(() => setPageViews(null))
  }, [blog.urlPath])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F2F2F2', color: '#000000', ...bodyStyle }}>
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" style={{ backgroundColor: '#F2F2F2' }}></div>

      <div className="w-full mb-16 h-[28px]" style={{ backgroundColor: blog.backgroundColor }}></div>

      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="max-w-full" style={{ width: '100%' }}>
          <h1 className="leading-tight" style={headerStyle}>
            {blog.title}
          </h1>
        </div>
        {blog.subtitle && (
          <div className="mb-8 md:mb-10 max-w-full" style={{ width: '100%' }}>
            <p className="leading-tight" style={bodyStyle}>
              {blog.subtitle}
            </p>
          </div>
        )}
      </div>

      <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mb-10 md:mb-12 lg:mb-16">
        <div className="border-t" style={{ borderColor: '#00000026' }}></div>
      </div>

      <div className="pb-16">
        <div ref={contentContainerRef} className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto" style={{ color: '#000000' }}>
          <div className="sm:hidden mb-4">
            <Icon icon="pixel:pen" width={32} height={32} style={{ color: '#000000', opacity: 0.9 }} className="icon-animated" />
          </div>

          <MarkdownContentBlocks blocks={blog.initialContent} />

          {(blog.movies || []).map((movie) => (
            <div key={`${movie.directoryFolder}-${movie.title}`} className="mb-16 max-w-full" style={{ width: '100%' }}>
              <div
                className="mb-6 w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
                style={{
                  background: 'white',
                  padding: '4px',
                  border: '1px solid #999',
                  boxSizing: 'border-box',
                }}
              >
                <img
                  src={`/movie-review-photos/${photosFolder}/${movie.directoryFolder}/poster.jpg`}
                  alt={`${movie.title} poster`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <h2 className="leading-tight mb-8" style={listingTitleStyle}>
                {movie.letterboxedLink ? (
                  <a
                    href={movie.letterboxedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {movie.title} ({movie.year})
                  </a>
                ) : (
                  <>{movie.title} ({movie.year})</>
                )}
              </h2>

              <MarkdownContentBlocks blocks={movie.reviewContents} />

              <MovieScreenshotGallery
                screenshots={movie.screenshots}
                photosFolder={photosFolder}
                directoryFolder={movie.directoryFolder}
              />

              {(movie.ratings || []).map((rating) => (
                <div key={rating.label} className="mb-4 max-w-full" style={{ width: '100%' }}>
                  <p className="leading-tight" style={bodyStyle}>
                    <span style={{ marginRight: '8px' }}>{rating.label}</span>
                    <RatingEmojis emoji={rating.emoji} rating={rating.rating} />
                  </p>
                </div>
              ))}
            </div>
          ))}

          <MarkdownContentBlocks blocks={blog.endingContent} />
        </div>

        <div className="w-full px-3 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto">
          <div className="mt-28 pt-12 border-t" style={{ borderColor: '#00000026' }}>
            {pageViews !== null && (
              <div className="mb-10 max-w-full" style={{ width: '100%' }}>
                <p className="opacity-50" style={bodyStyle}>
                  Page views: {pageViews}
                </p>
              </div>
            )}

            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-10 max-w-full" style={{ width: '100%' }}>
                <p style={bodyStyle}>
                  <span style={{ marginRight: '4px', opacity: 0.5 }}>Tags:</span>
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      onClick={(e) => e.preventDefault()}
                      style={{
                        color: 'var(--link-color)',
                        cursor: 'pointer',
                        marginRight: index < blog.tags.length - 1 ? '3px' : '0',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            )}

            <div className="max-w-full" style={{ width: '100%' }}>
              <p className="opacity-50" style={bodyStyle}>
                Published {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default MovieReviewTemplate
