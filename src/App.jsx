import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import PhotoEssays from './pages/PhotoEssays'
import Games from './pages/Games'
import Playlists from './pages/Playlists'
import Me from './pages/Me'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/photo-essays" element={<PhotoEssays />} />
        <Route path="/games" element={<Games />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/me" element={<Me />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
