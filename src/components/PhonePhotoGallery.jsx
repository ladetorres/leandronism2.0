import { useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import LeftAlignedIcon from './LeftAlignedIcon'

// Camera icon component to match the interface expected by parent
const CameraIcon = ({ size, style }) => (
  <Icon icon="pixel:camera" width={size} height={size} style={{ ...style, opacity: 0.9 }} className="icon-animated" />
)

function PhonePhotoGallery({ phonePhotosGallery, fontFamily, useTahoma, retroStyles, textColor }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const headerContainerRef = useRef(null)

  if (!phonePhotosGallery || Object.keys(phonePhotosGallery).length === 0) {
    return null
  }

  // Get the folder name and photos list
  const folderName = Object.keys(phonePhotosGallery)[0]
  const photos = phonePhotosGallery[folderName]

  if (!photos || photos.length === 0) {
    return null
  }

  const currentPhoto = photos[currentIndex]
  const linkColor = 'var(--link-color)'

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleIndexClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <>
      {/* Header with camera icon */}
      <div ref={headerContainerRef} className="w-full sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto mt-20 mb-8" style={{ color: textColor }}>
        {/* Camera icon for xs - above the text */}
        <div className="sm:hidden mb-4">
          <Icon icon="pixel:camera" width={32} height={32} style={{ color: textColor, opacity: 0.9 }} className="icon-animated" />
        </div>

        {/* Header text */}
        <div style={{ minHeight: 'fit-content', width: '100%' }}>
          <p 
            className={`${useTahoma ? '' : 'font-serif'} text-size-2 leading-tight`} 
            style={{ 
              transform: 'scale(8)',
              transformOrigin: 'top left',
              imageRendering: 'pixelated',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              lineHeight: '1.25',
              fontFamily, 
              width: '12.5%',
              wordBreak: 'break-word',
              margin: 0
            }}
          >
            images from my phone
          </p>
        </div>
      </div>

      {/* Left-aligned camera icon for sm and up */}
      <LeftAlignedIcon 
        Icon={CameraIcon}
        size={32}
        color={textColor}
        containerRef={headerContainerRef}
        gap={32}
        showAbove={false}
      />

      <div className="w-full sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[630px] mx-auto">
      {/* Image preview and caption side by side */}
      <div className="mb-4 flex gap-4">
        {/* Image */}
        <div style={{ width: '50%', aspectRatio: '3/4', flexShrink: 0 }}>
          <img
            src={`/blog-photos/${folderName}/${currentPhoto.fileName}.jpg`}
            alt={currentPhoto.caption}
            onError={(e) => {
              // Try alternative extensions if jpg fails
              const basePath = `/blog-photos/${folderName}/${currentPhoto.fileName}`
              const currentSrc = e.target.src
              
              if (currentSrc.endsWith('.jpg')) {
                e.target.src = `${basePath}.JPG`
              } else if (currentSrc.endsWith('.JPG')) {
                e.target.src = `${basePath}.png`
              } else if (currentSrc.endsWith('.png')) {
                e.target.src = `${basePath}.jpeg`
              } else if (currentSrc.endsWith('.jpeg')) {
                e.target.src = `${basePath}.JPEG`
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              background: 'white',
              padding: '4px',
              border: '1px solid #999'
            }}
          />
        </div>

        {/* Caption and metadata */}
        <div style={{ flex: 1 }}>
          {/* Caption */}
          {currentPhoto.caption && (
            <div className="mb-4" style={{ minHeight: '20px' }}>
              <div style={{ width: '25%' }}>
                <p 
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
                  style={{ 
                    transform: 'scale(8)',
                    transformOrigin: 'top left',
                    imageRendering: 'pixelated',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'grayscale',
                    lineHeight: '1.25',
                    fontFamily,
                    textAlign: 'left',
                    opacity: 0.6
                  }}
                >
                  {currentPhoto.caption}
                </p>
              </div>
            </div>
          )}

          {/* Filename */}
          <div className="mb-2" style={{ minHeight: '20px' }}>
            <div style={{ width: '25%' }}>
              <p 
                className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
                style={{ 
                  transform: 'scale(8)',
                  transformOrigin: 'top left',
                  imageRendering: 'pixelated',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                  lineHeight: '1.25',
                  fontFamily,
                  textAlign: 'left',
                  opacity: 0.4
                }}
              >
                {currentPhoto.fileNameWithExt || `${currentPhoto.fileName}.jpg`}
              </p>
            </div>
          </div>

          {/* Location / Coordinates */}
          {(currentPhoto.location || currentPhoto.coordinates) && (
            <div className="mb-2" style={{ minHeight: '20px' }}>
              <div style={{ width: '25%' }}>
                <p 
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
                  style={{ 
                    transform: 'scale(8)',
                    transformOrigin: 'top left',
                    imageRendering: 'pixelated',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'grayscale',
                    lineHeight: '1.25',
                    fontFamily,
                    textAlign: 'left',
                    opacity: 0.4
                  }}
                >
                  {currentPhoto.coordinates && `${currentPhoto.coordinates}`}
                  {currentPhoto.coordinates && currentPhoto.location && ' '}
                  {currentPhoto.location && currentPhoto.location}
                </p>
              </div>
            </div>
          )}

          {/* Camera Settings */}
          {(currentPhoto.focalLength || currentPhoto.fNumber || currentPhoto.exposure) && (
            <div style={{ minHeight: '20px' }}>
              <div style={{ width: '25%' }}>
                <p 
                  className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
                  style={{ 
                    transform: 'scale(8)',
                    transformOrigin: 'top left',
                    imageRendering: 'pixelated',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'grayscale',
                    lineHeight: '1.25',
                    fontFamily,
                    textAlign: 'left',
                    opacity: 0.4
                  }}
                >
                  {currentPhoto.focalLength && currentPhoto.focalLength}
                  {currentPhoto.focalLength && currentPhoto.fNumber && ' '}
                  {currentPhoto.fNumber && currentPhoto.fNumber}
                  {(currentPhoto.focalLength || currentPhoto.fNumber) && currentPhoto.exposure && ' '}
                  {currentPhoto.exposure && `${currentPhoto.exposure}s`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="space-y-2">
        {/* Previous/Next line */}
        <div style={{ minHeight: '20px' }}>
          <div style={{ display: 'inline-block' }}>
            <p 
              className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
              style={{ 
                transform: 'scale(8)',
                transformOrigin: 'top left',
                imageRendering: 'pixelated',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'grayscale',
                lineHeight: '1.25',
                fontFamily,
                whiteSpace: 'nowrap'
              }}
            >
              <span
                onClick={handlePrevious}
                style={{
                  color: currentIndex === 0 ? 'gray' : linkColor,
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  marginRight: '4px',
                  opacity: currentIndex === 0 ? 0.5 : 1
                }}
              >
                Previous
              </span>
              <span
                onClick={handleNext}
                style={{
                  color: currentIndex === photos.length - 1 ? 'gray' : linkColor,
                  cursor: currentIndex === photos.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === photos.length - 1 ? 0.5 : 1
                }}
              >
                Next
              </span>
            </p>
          </div>
        </div>

        {/* Index numbers line */}
        <div style={{ minHeight: '20px' }}>
          <div style={{ display: 'inline-block' }}>
            <p 
              className={`${useTahoma ? '' : 'font-serif'} text-size-2`} 
              style={{ 
                transform: 'scale(8)',
                transformOrigin: 'top left',
                imageRendering: 'pixelated',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'grayscale',
                lineHeight: '1.25',
                fontFamily,
                whiteSpace: 'nowrap'
              }}
            >
              {photos.map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleIndexClick(index)}
                  style={{
                    color: currentIndex === index ? 'gray' : linkColor,
                    cursor: currentIndex === index ? 'not-allowed' : 'pointer',
                    marginRight: index < photos.length - 1 ? '2px' : '0',
                    opacity: currentIndex === index ? 0.5 : 1
                  }}
                >
                  {index + 1}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PhonePhotoGallery
