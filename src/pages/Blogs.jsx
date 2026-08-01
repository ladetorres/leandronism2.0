import { Link } from 'react-router-dom'
import { blogData } from '../data/blogData'
import { useRef, useEffect, useState } from 'react'

function ContactMe() {
  const textRefs = useRef([])
  const [textHeights, setTextHeights] = useState([])

  const retroStyles = {
    transform: 'scale(8)',
    transformOrigin: 'top left',
    imageRendering: 'pixelated',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'grayscale',
  }

  useEffect(() => {
    const calculateHeights = () => {
      const heights = textRefs.current.map(ref => {
        if (ref) {
          return ref.scrollHeight * 8
        }
        return 0
      })
      setTextHeights(heights)
    }

    calculateHeights()
    window.addEventListener('resize', calculateHeights)
    return () => window.removeEventListener('resize', calculateHeights)
  }, [])

  return (
    <div className="space-y-8">
      {/* Intro text */}
      <div style={{ minHeight: `${textHeights[0] || 60}px`, width: '100%' }}>
        <p
          ref={el => textRefs.current[0] = el}
          className="text-size-2 leading-tight"
          style={{
            ...retroStyles,
            width: '12.5%',
            fontFamily: 'Tahoma, sans-serif'
          }}
        >
          hi! i'm leandro. i write decent code, i write better prompts, i write stories the best
        </p>
      </div>
      {/* Intro text #2 */}
      <div style={{ minHeight: `${textHeights[1] || 60}px`, width: '100%' }}>
        <p
          ref={el => textRefs.current[1] = el}
          className="text-size-2 leading-tight"
          style={{
            ...retroStyles,
            width: '12.5%',
            fontFamily: 'Tahoma, sans-serif'
          }}
        >
          i go on solo travel and take photos with my dslr, too!
        </p>
      </div>
      <div style={{ minHeight: `${textHeights[2] || 60}px`, width: '100%' }}>
        <p
          ref={el => textRefs.current[2] = el}
          className="text-size-2 leading-tight"
          style={{
            ...retroStyles,
            width: '12.5%',
            fontFamily: 'Tahoma, sans-serif'
          }}
        >
          if you enjoyed my photo essays or want to know my favorite pokemon,
          i'd be happy to chat (no not really)
        </p>
      </div>

      {/* Email */}
      <div style={{ minHeight: `${textHeights[3] || 20}px`, width: '100%' }}>
        <p
          ref={el => textRefs.current[2] = el}
          className="text-size-2 leading-tight"
          style={{
            ...retroStyles,
            width: '12.5%',
            fontFamily: 'Tahoma, sans-serif'
          }}
        >
          leandrodetorres23 [at] gmail [dot] com
        </p>
      </div>

      {/* Instagram QR */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ minHeight: `${textHeights[4] || 20}px`, width: '100%', marginBottom: '8px' }}>
          <p
            ref={el => textRefs.current[4] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            let's be mutuals on insta
          </p>
        </div>
        <div style={{
          background: 'white',
          padding: '4px',
          border: '1px solid #999',
          width: 'fit-content'
        }}>
          <img
            src="/contact-me/insta-qr-2.jpg"
            alt="Instagram QR"
            style={{ width: '150px', height: '150px', display: 'block' }}
          />
        </div>
      </div>

      {/* Letterboxd QR */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ minHeight: `${textHeights[5] || 20}px`, width: '100%', marginBottom: '8px' }}>
          <p
            ref={el => textRefs.current[5] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            compare our top four films here
          </p>
        </div>
        <div style={{
          background: 'white',
          padding: '4px',
          border: '1px solid #999',
          width: 'fit-content'
        }}>
          <img
            src="/contact-me/letterboxd-qr.png"
            alt="Letterboxd QR"
            style={{ width: '150px', height: '150px', display: 'block' }}
          />
        </div>
      </div>

      {/* Links */}
      <div>
        <div style={{ minHeight: `${textHeights[6] || 10}px`, width: '100%', marginBottom: '8px' }}>
          <p
            ref={el => textRefs.current[6] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
              see more:
          </p>
        </div>
        <div style={{ minHeight: `${textHeights[7] || 20}px`, width: '100%', marginBottom: '8px' }}>
          <p
            ref={el => textRefs.current[7] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            <a href="https://unsplash.com/@ladetorres" target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }}>
              photos from my dslr
            </a>
          </p>
        </div>
        <div style={{ minHeight: `${textHeights[8] || 20}px`, width: '100%', marginBottom: '8px' }}>
          <p
            ref={el => textRefs.current[8] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            <a href="https://medium.com/@leandronism" target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }}>
              my short stories
            </a>
          </p>
        </div>
        <div style={{ minHeight: `${textHeights[9] || 20}px`, width: '100%', marginBottom: '32px'}}>
          <p
            ref={el => textRefs.current[9] = el}
            className="text-size-2 leading-tight"
            style={{
              ...retroStyles,
              width: '12.5%',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            <a href="https://github.com/ladetorres/leandronism2.0" target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }}>
              my git repository
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Blogs() {
  const blogRefs = useRef([])
  const [blogHeights, setBlogHeights] = useState([])

  const retroStyles = {
    transform: 'scale(8)',
    transformOrigin: 'top left',
    imageRendering: 'pixelated',
    WebkitFontSmoothing: 'none',
    MozOsxFontSmoothing: 'grayscale',
  }

  useEffect(() => {
    const calculateHeights = () => {
      const heights = blogRefs.current.map((ref, idx) => {
        if (ref) {
          const height = ref.scrollHeight
          // All elements now use scale(8)
          return height * 8
        }
        return 0
      })
      setBlogHeights(heights)
    }

    calculateHeights()
    window.addEventListener('resize', calculateHeights)
    return () => window.removeEventListener('resize', calculateHeights)
  }, [])

  useEffect(() => {
    // Set body background to match page background
    document.body.style.backgroundColor = '#FFFFFF'
    return () => {
      // Reset to black when leaving this page
      document.body.style.backgroundColor = '#000000'
    }
  }, [])

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: '#FFFFFF', color: '#333333' }}>
      {/* Empty space at top */}
      <div style={{
        height: '130px',
        '@media (min-width: 768px)': { height: '140px' },
        '@media (min-width: 1024px)': { height: '150px' },
        '@media (min-width: 1280px)': { height: '160px' }
      }} className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" />

      {/* Two-column layout for xl+, single column for lg and below */}
      <div className="w-full xl:max-w-[1200px] mx-auto">
        {/* Page title */}
        <div className="w-full px-3 xl:px-0 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[892px] xl:w-[892px] mx-auto mb-12">
          <div style={{ minHeight: '32px', width: '100%' }}>
            <h1
              className="text-size-1 leading-tight"
              style={{
                transform: 'scale(32)',
                transformOrigin: 'top left',
                imageRendering: 'pixelated',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'grayscale',
                width: '3.125%',
                fontFamily: 'Tahoma, sans-serif'
              }}
            >
              leandronism
            </h1>
          </div>
        </div>

        <div className="xl:flex xl:gap-8 xl:justify-center">
          {/* Blog list */}
          <div className="px-3 xl:px-0 xl:flex-none sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[560px] xl:w-[560px] mx-auto xl:mx-0 space-y-8">
        {[...blogData].sort((a, b) => new Date(b.date) - new Date(a.date)).map((blog, index) => (
          <Link
            key={blog.id}
            to={blog.urlPath}
            className="block"
          >
            <article className="mb-8 flex gap-4" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
              {/* Featured Image — prefer blogFeaturedImagePath over featuredImage */}
              {(() => {
                const rawPath = blog.blogFeaturedImagePath || blog.featuredImage
                if (!rawPath) return null
                const src = rawPath.startsWith('public/')
                  ? '/' + rawPath.replace('public/', '')
                  : rawPath

                return (
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      flexShrink: 0,
                      background: 'white',
                      padding: '4px',
                      border: '1px solid #999'
                    }}
                  >
                    <img
                      src={src}
                      alt={blog.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )
              })()}

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                {/* Title */}
                <div style={{ minHeight: `${blogHeights[index * 3] || 40}px`, width: '100%', marginBottom: '8px' }}>
                  <h2
                    ref={el => blogRefs.current[index * 3] = el}
                    className="text-size-3 leading-tight"
                    style={{
                      transform: 'scale(8)',
                      transformOrigin: 'top left',
                      imageRendering: 'pixelated',
                      WebkitFontSmoothing: 'none',
                      MozOsxFontSmoothing: 'grayscale',
                      width: '12.5%',
                      fontFamily: 'Tahoma, sans-serif',
                      color: '#0000EE'
                    }}
                  >
                    {blog.title}
                  </h2>
                </div>

                {/* Subtitle */}
                {blog.subtitle && (
                  <div style={{ minHeight: `${blogHeights[index * 3 + 1] || 20}px`, width: '100%' }}>
                    <p
                      ref={el => blogRefs.current[index * 3 + 1] = el}
                      className="text-size-2 leading-tight"
                      style={{
                        ...retroStyles,
                        width: '12.5%',
                        opacity: 0.7,
                        fontFamily: 'Tahoma, sans-serif'
                      }}
                    >
                      {blog.subtitle}
                    </p>
                  </div>
                )}

                {/* Date and tags */}
                <div style={{ minHeight: `${blogHeights[index * 3 + 2] || 20}px`, width: '100%', marginTop: '8px' }}>
                  <div
                    ref={el => blogRefs.current[index * 3 + 2] = el}
                    className="text-size-2 leading-tight"
                    style={{
                      ...retroStyles,
                      width: '12.5%',
                      opacity: 0.5,
                      fontFamily: 'Tahoma, sans-serif'
                    }}
                  >
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} ·{' '}
                    {blog.tags && blog.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          style={{
                            color: '#0000EE',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            opacity: 1
                          }}
                        >
                          {tag}
                        </a>
                        {tagIndex < blog.tags.length - 1 && <span style={{ marginLeft: '1.5px', marginRight: '1.5px' }}> </span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {/* Contact Me section - visible on lg and below */}
        <div className="xl:hidden mt-12 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] mx-auto" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
          <ContactMe />
        </div>
      </div>

      {/* Contact Me section - visible on xl+ */}
      <div className="hidden xl:block xl:w-[300px] xl:flex-none" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
        <ContactMe />
      </div>
    </div>
  </div>
</div>
  )
}

export default Blogs
