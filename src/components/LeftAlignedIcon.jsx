import { useEffect, useState } from 'react'

/**
 * A reusable component that displays an icon either:
 * - Above the container for xs breakpoint (< 640px)
 * - To the left of the container for sm+ breakpoints (640px+)
 * 
 * @param {React.Component} Icon - The icon component to render
 * @param {number} size - Icon size in pixels
 * @param {string} color - Icon color
 * @param {React.RefObject} containerRef - Ref to the target container
 * @param {number} gap - Gap distance from container in pixels (for sm+)
 * @param {boolean} showAbove - Whether to show the icon above on xs breakpoint
 */
function LeftAlignedIcon({ Icon, size = 32, color, containerRef, gap = 32, showAbove = true }) {
  const [iconPosition, setIconPosition] = useState(null)

  // Track container position for icon placement on sm+
  useEffect(() => {
    const updateIconPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        setIconPosition({
          top: rect.top + scrollTop,
          left: rect.left - gap - size // gap + icon width
        })
      }
    }

    // Initial update
    updateIconPosition()
    
    // Update on resize and scroll
    window.addEventListener('resize', updateIconPosition)
    window.addEventListener('scroll', updateIconPosition)
    
    // Small delay to ensure container is rendered
    const timeoutId = setTimeout(updateIconPosition, 100)
    
    return () => {
      window.removeEventListener('resize', updateIconPosition)
      window.removeEventListener('scroll', updateIconPosition)
      clearTimeout(timeoutId)
    }
  }, [containerRef, gap, size])

  return (
    <>
      {/* Icon for xs - above the container */}
      {showAbove && (
        <div className="sm:hidden mb-4">
          <Icon size={size} style={{ color }} />
        </div>
      )}

      {/* Icon for sm and up - positioned to the left */}
      {iconPosition && (
        <div 
          className="hidden sm:block absolute pointer-events-none" 
          style={{ 
            top: `${iconPosition.top}px`, 
            left: `${iconPosition.left}px` 
          }}
        >
          <Icon size={size} style={{ color }} />
        </div>
      )}
    </>
  )
}

export default LeftAlignedIcon
