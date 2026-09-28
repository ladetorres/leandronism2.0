import { Link } from 'react-router-dom'
import { blogData } from '../data/blogData'
import { useEffect } from 'react'
import { bodyStyle, listingTitleStyle, pageTitleStyle } from '../styles/siteFonts'

function ContactMe() {
  return (
    <div className="space-y-6">
      <div style={{ width: '100%' }}>
        <p className="leading-tight" style={bodyStyle}>
          hi! i'm leandro. i write decent code, i write better prompts, i write stories the best
        </p>
      </div>
      <div style={{ width: '100%' }}>
        <p className="leading-tight" style={bodyStyle}>
          i go on solo travel and take photos with my dslr, too!
        </p>
      </div>
      <div style={{ width: '100%' }}>
        <p className="leading-tight" style={bodyStyle}>
          if you enjoyed my photo essays or want to know my favorite pokemon,
          i'd be happy to chat (no not really)
        </p>
      </div>

      <div style={{ width: '100%' }}>
        <p className="leading-tight" style={bodyStyle}>
          leandrodetorres23 [at] gmail [dot] com
        </p>
      </div>

      <div style={{ marginTop: '16px' }}>
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <p className="leading-tight" style={bodyStyle}>
            let's be mutuals on insta:
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

      <div style={{ marginTop: '16px' }}>
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <p className="leading-tight" style={bodyStyle}>
            compare our top four films here:
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

      <div>
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <p className="leading-tight" style={bodyStyle}>
              see more:
          </p>
        </div>
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <p className="leading-tight" style={bodyStyle}>
            <a href="https://unsplash.com/@ladetorres" target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }}>
              photos from my dslr
            </a>
          </p>
        </div>
        <div style={{ width: '100%', marginBottom: '8px' }}>
          <p className="leading-tight" style={bodyStyle}>
            <a href="https://medium.com/@leandronism" target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE', textDecoration: 'none' }}>
              my short stories
            </a>
          </p>
        </div>
        <div style={{ width: '100%', marginBottom: '32px'}}>
          <p className="leading-tight" style={bodyStyle}>
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
  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF'
    return () => {
      document.body.style.backgroundColor = '#000000'
    }
  }, [])

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: '#FFFFFF', color: '#333333', ...bodyStyle }}>
      <div className="h-[130px] md:h-[140px] lg:h-[150px] xl:h-[160px]" />

      <div className="w-full xl:max-w-[1200px] mx-auto">
        <div className="w-full px-3 xl:px-0 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[892px] xl:w-[892px] mx-auto mb-12">
          <div style={{ width: '100%' }}>
            <h1
              className="leading-tight"
              style={pageTitleStyle}
            >
              leandronism
            </h1>
          </div>
        </div>

        <div className="xl:flex xl:gap-8 xl:justify-center">
          <div className="px-3 xl:px-0 xl:flex-none sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] xl:max-w-[560px] xl:w-[560px] mx-auto xl:mx-0 space-y-8">
        {[...blogData].sort((a, b) => new Date(b.date) - new Date(a.date)).map((blog) => (
          <Link
            key={blog.id}
            to={blog.urlPath}
            className="block"
          >
            <article className="mb-8 flex gap-4" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
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

              <div style={{ flex: 1 }}>
                <div style={{ width: '100%', marginBottom: '8px' }}>
                  <h2
                    className="leading-tight"
                    style={{
                      ...listingTitleStyle,
                      color: '#0000EE'
                    }}
                  >
                    {blog.title}
                  </h2>
                </div>

                {blog.subtitle && (
                  <div style={{ width: '100%' }}>
                    <p
                      className="leading-tight"
                      style={{
                        ...bodyStyle,
                        opacity: 0.9,
                      }}
                    >
                      {blog.subtitle}
                    </p>
                  </div>
                )}

                <div style={{ width: '100%', marginTop: '8px' }}>
                  <div
                    className="leading-tight"
                    style={{
                      ...bodyStyle,
                      opacity: 0.5,
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

        <div className="xl:hidden mt-12 sm:max-w-[360px] md:max-w-[450px] lg:max-w-[540px] mx-auto" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
          <ContactMe />
        </div>
      </div>

      <div className="hidden xl:block xl:w-[300px] xl:flex-none" style={{ backgroundColor: '#F2F2F2', padding: '12px' }}>
        <ContactMe />
      </div>
    </div>
  </div>
</div>
  )
}

export default Blogs
