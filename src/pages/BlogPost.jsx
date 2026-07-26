import { useParams, Navigate } from 'react-router-dom'
import { getBlogByPath } from '../data/blogData'
import PhotoEssayTemplate from '../components/blog-templates/PhotoEssayTemplate'
import BlogTemplate from '../components/blog-templates/BlogTemplate'
import PlaylistTemplate from '../components/blog-templates/PlaylistTemplate'
import GameTemplate from '../components/blog-templates/GameTemplate'

function BlogPost() {
  const { slug } = useParams()
  const blog = getBlogByPath(`/blogs/${slug}`)

  // If blog not found, redirect to home page
  if (!blog) {
    return <Navigate to="/" replace />
  }

  // Render appropriate template based on blog type
  const renderBlog = () => {
    switch (blog.type) {
      case 'photo-essay':
        return <PhotoEssayTemplate blog={blog} />
      case 'blog':
        return <BlogTemplate blog={blog} />
      case 'playlist':
        return <PlaylistTemplate blog={blog} />
      case 'game':
        return <GameTemplate blog={blog} />
      default:
        return <BlogTemplate blog={blog} />
    }
  }

  return renderBlog()
}

export default BlogPost
