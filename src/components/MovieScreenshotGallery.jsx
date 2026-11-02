import { useState } from 'react'
import { bodyStyle } from '../styles/siteFonts'

function MovieScreenshotGallery({ screenshots, photosFolder, directoryFolder }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!screenshots || screenshots.length === 0) return null

  const current = screenshots[currentIndex]
  const src = `/movie-review-photos/${photosFolder}/${directoryFolder}/${current.file}.png`
  const linkColor = 'var(--link-color)'

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleNext = () => {
    if (currentIndex < screenshots.length - 1) setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="mb-12 max-w-full" style={{ width: '100%' }}>
      <p className="leading-tight mb-4" style={bodyStyle}>
        SCREENS
      </p>

      <div
        className="w-full"
        style={{
          aspectRatio: '5 / 3',
          background: 'black',
          padding: '4px',
          border: '1px solid #999',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={src}
          alt={current.caption || current.file}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {current.caption && (
        <p
          className="leading-tight mt-3"
          style={{
            ...bodyStyle,
            textAlign: 'center',
            opacity: 0.6,
          }}
        >
          {current.caption}
        </p>
      )}

      <div className="space-y-2 mt-4">
        <div>
          <p
            className=""
            style={{
              ...bodyStyle,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              onClick={handlePrevious}
              style={{
                color: currentIndex === 0 ? 'gray' : linkColor,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                marginRight: '10px',
                opacity: currentIndex === 0 ? 0.5 : 1,
              }}
            >
              Previous
            </span>
            <span
              onClick={handleNext}
              style={{
                color: currentIndex === screenshots.length - 1 ? 'gray' : linkColor,
                cursor: currentIndex === screenshots.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === screenshots.length - 1 ? 0.5 : 1,
              }}
            >
              Next
            </span>
          </p>
        </div>

        <div>
          <p
            className=""
            style={{
              ...bodyStyle,
              whiteSpace: 'nowrap',
            }}
          >
            {screenshots.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  color: currentIndex === index ? 'gray' : linkColor,
                  cursor: currentIndex === index ? 'not-allowed' : 'pointer',
                  marginRight: index < screenshots.length - 1 ? '8px' : '0',
                  opacity: currentIndex === index ? 0.5 : 1,
                }}
              >
                {index + 1}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieScreenshotGallery
