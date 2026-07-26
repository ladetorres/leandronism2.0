import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import PhotoEssays from './pages/PhotoEssays'
import Games from './pages/Games'
import Playlists from './pages/Playlists'
import Me from './pages/Me'
import './App.css'

function App() {
  return (
    <>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/photo-essays" element={<PhotoEssays />} />
          <Route path="/games" element={<Games />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/me" element={<Me />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
