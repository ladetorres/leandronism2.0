import { useState, useEffect } from 'react'

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for fonts to load
    const checkFontsLoaded = async () => {
      try {
        // Check for both fonts
        await Promise.all([
          document.fonts.load('400 1em "Cormorant Garamond"'),
          document.fonts.load('400 1em "Source Serif 4"'),
        ])
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      } catch (error) {
        // If font loading fails, show content anyway after 2 seconds
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    }

    checkFontsLoaded()
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  )
}

export default LoadingScreen
