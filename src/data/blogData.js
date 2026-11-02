// Blog data structure
// Each blog post has a type: 'photo-essay', 'blog', 'playlist', 'game', or 'movie-review'

import { kaohsiungCrashouts } from '../blogs/photo-essays/kaohsiungCrashouts'
import { pointlessnessOfLearning } from '../blogs/blogs/pointlessnessOfLearning'
import { august2026 } from '../blogs/playlists/august2026'
import { pocketMonsterParty } from '../blogs/games/pocketMonsterParty'
import { september2026 } from '../blogs/playlists/september2026'
import { pokeGuessWho } from '../blogs/games/pokeGuessWho'
import { october2026 } from '../blogs/playlists/october2026'
import { november2026 } from '../blogs/playlists/november2026'
import { hongkongVenting } from '../blogs/photo-essays/hongkongVenting'
import { rowletRun } from '../blogs/games/rowletRun'
import { cosmicHorror } from '../blogs/movie-reviews/cosmicHorror'

export const blogData = [
  kaohsiungCrashouts,
  pointlessnessOfLearning,
  august2026,
  pocketMonsterParty,
  september2026,
  pokeGuessWho,
  october2026,
  november2026,
  hongkongVenting,
  // rowletRun,
  // cosmicHorror,
]

// Helper function to find blog by URL path
export const getBlogByPath = (urlPath) => {
  return blogData.find(blog => blog.urlPath === urlPath)
}

// Helper function to get all blogs by type
export const getBlogsByType = (type) => {
  return blogData.filter(blog => blog.type === type)
}

// Helper function to get recent blogs
export const getRecentBlogs = (count = 5) => {
  return [...blogData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count)
}
