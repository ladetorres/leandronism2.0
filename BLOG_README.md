# Blog System Structure

Your data-driven blog system is ready! Here's how it works:

## 📁 Folder Structure

```
src/
├── data/
│   └── blogData.js           # ALL blog post data in one file
├── pages/
│   ├── Blogs.jsx              # Blog listing page
│   └── BlogPost.jsx           # Dynamic blog post router
└── components/
    └── blog-templates/
        ├── PhotoEssayTemplate.jsx   # Template for photo essays
        ├── BlogTemplate.jsx         # Template for regular blogs
        └── PlaylistTemplate.jsx     # Template for playlists
```

## 🎯 How It Works

### 1. Add a New Blog Post

Just add a new object to `src/data/blogData.js`:

```javascript
{
  id: 5,
  title: 'your blog title',
  urlPath: '/blogs/your-slug',
  subtitle: 'optional subtitle',
  type: 'blog', // or 'photo-essay' or 'playlist'
  date: '2026-07-15',
  content: `Your content here...`
}
```

### 2. Blog Types

**Photo Essay** (`type: 'photo-essay'`)
```javascript
{
  type: 'photo-essay',
  headerImage: 'https://...',
  photos: [
    { url: 'https://...', caption: 'photo caption' }
  ],
  content: 'Intro text...'
}
```

**Regular Blog** (`type: 'blog'`)
```javascript
{
  type: 'blog',
  content: `
# Markdown supported!

Your blog content with **markdown** formatting.
  `
}
```

**Playlist** (`type: 'playlist'`)
```javascript
{
  type: 'playlist',
  playlistEmbed: 'https://open.spotify.com/embed/...',
  songs: [
    { title: 'Song Name', artist: 'Artist Name' }
  ],
  content: 'Short description...'
}
```

## 🔗 URLs

Each blog post automatically gets its own URL based on `urlPath`:

- `/blogs/tokyo-winter`
- `/blogs/creative-burnout`
- `/blogs/february-2026-playlist`

## 📝 Sample Blog Posts

I've created 5 sample posts for you to play with:
1. **Tokyo in Winter** - Photo essay
2. **On Creative Burnout** - Regular blog
3. **February 2026 Playlist** - Playlist
4. **Street Food Chronicles** - Photo essay

## 🚀 Test It Out

Run `npm run dev` and visit:
- `/blogs` - See all blogs
- `/blogs/tokyo-winter` - View a photo essay
- `/blogs/creative-burnout` - View a regular blog
- `/blogs/february-2026-playlist` - View a playlist

## ✏️ Customizing

### Change Template Styling
Edit the template files in `src/components/blog-templates/`

### Add New Blog Fields
1. Add fields to blogData.js
2. Update the corresponding template to use them

### Helper Functions Available

```javascript
import { 
  getBlogByPath,     // Find blog by URL
  getBlogsByType,    // Filter by type
  getRecentBlogs     // Get most recent
} from '../data/blogData'
```

No more creating separate files for each blog post!
